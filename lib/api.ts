import axios from "axios";
import dotenv from 'dotenv'
import { getToken, refreshToken, setAccessToken, setRefreshToken } from "./utils";
import { HTTPResponse } from '../types/index';
import { isPublicRoute } from "./middleware";

dotenv.config();

let isRefreshing = false;
let queue: { resolve: (value: unknown) => void; reject: (reason?: any) => void; }[] = [];

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    },    
    withCredentials: true
});

instance.interceptors.request.use((config)=> {

    if(config.url && isPublicRoute.includes(config.url)){
        const accessToken = getToken();
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config;
})

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

               const accessToken = await refreshToken();
                    
                queue.forEach(p => p.resolve(accessToken));
                error.config.headers.Authorization = `Bearer ${accessToken}`;
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


export default async function apiFetch (url: string, data?: object | undefined,  method?: 'GET'| 'POST'| 'PUT'| 'PATCH' | 'DELETE') {

    if(!method)
        method = 'GET';


    try{

        const res: HTTPResponse = await instance({url, method, data})
        .then((response)=> response.data);

        return res;

    }catch(err){
        throw err
    }
}