import axios from "axios";
import dotenv from 'dotenv'
import { getToken, refreshToken, setAccessToken, setRefreshToken } from "./utils";
import { HTTPResponse } from '../types/index';
import { isPublicRoute } from "./middleware";

dotenv.config();

let isRefreshing = false;
let queue: { resolve: (value: unknown) => void; reject: (reason?: any) => void; }[] = [];

/**
 * The instance in charge of all HTTP request accross the app
 */
const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    },    
    withCredentials: true
});

/**
 * Intercept each request before it's made and supply the access token regarding the middleware
 * Check https://axios-http.com/docs/interceptors for more info.
 */
instance.interceptors.request.use((config)=> {

    if(config.url && isPublicRoute.includes(config.url)){
        const access_token = getToken();
        config.headers.Authorization = `Bearer ${access_token}`
    }

    return config;
})

/**
 * Intercept each response and check whether there is an Unauthorized response to apply the refresh token query.
 * Check https://axios-http.com/docs/interceptors for more infos
 */
instance.interceptors.response.use(
    (response)=> response, 
    async (error) => {

        if (error.response?.status === 401 && !error.config._retry) {

            error.config._retry= true;

            if(isRefreshing){
                return new Promise((resolve, reject)=>{
                    queue.push({resolve, reject});
                }).then(token => {
                    error.config.headers.Authorization = `Bearer ${token}`
                    return instance(error.config)
                })
            }
            
            isRefreshing= true;

            try{

               const access_token = await refreshToken();
                    
                queue.forEach(p => p.resolve(access_token));
                error.config.headers.Authorization = `Bearer ${access_token}`;
                instance(error.config)

            }catch(err){

                queue.forEach(p => p.reject());
                queue = [];
                return Promise.reject(err);

            }
            finally{

                isRefreshing=false;
                    
            }
        }

    throw error;
});

/**
 * The fetch agent use for all request accross the app
 * @param url the endpoint to reach
 * @param body the optional body 
 * @param method method of the request (optional: automatically set to GET when not supplied)
 * @returns res: HTTPResponse {success, message, data}
 */
export default async function apiFetch (url: string, body?: object | undefined,  method?: 'GET'| 'POST'| 'PUT'| 'PATCH' | 'DELETE') {

    if(!method)
        method = 'GET';

    try{

        const res: HTTPResponse = await instance({url, method, data:body})
        .then((response)=> response.data);

        return res;

    }catch(err){
        throw err
    }
}