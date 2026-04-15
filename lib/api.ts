import axios from "axios";
import { HTTPResponse } from '../types/index';
import { useTokenStore } from "@/hooks/store";

/**
 * The opened routes which any client can reach whithout authorization, except refresh token where the token is checked directly from the http cookie 
 */
export const publicAccessRoutes=[
  'login',
  'register',
  'refresh'
]

let isRefreshing = false;
let queue: { resolve: (value: unknown) => void; reject: (reason?: any) => void; }[] = [];

/**
 * The instance in charge of all HTTP request accross the app
 */
const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
    },    
    withCredentials: true
});

/**
 * Intercept each request before it's made and supply the access token regarding the middleware
 * Check https://axios-http.com/docs/interceptors for more info.
 */
instance.interceptors.request.use((config)=> {
    console.log(config.url)
    if(config.url && !publicAccessRoutes.find((route)=>config.url?.includes(route))){
        const access_token = useTokenStore.getState().access_token;
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

                const response = await axios.post('api/auth/refresh', {}, {
                    withCredentials: true
                });
                const { access_token } : { access_token: string } = response.data;

                queue.forEach(p => p.resolve(access_token));
                error.config.headers.Authorization = `Bearer ${access_token}`;
                instance(error.config)

            }catch(err){

                queue.forEach(p => p.reject());
                queue = [];
                Promise.reject(err);

                if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
                    window.location.href = '/login';
                }
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

        const res: HTTPResponse = await instance({url, method, data:body},)
        .then((response)=> response.data);

        return res;

    }catch(err){
        // Debugging errors in the console
        if (axios.isAxiosError(err)) {
            console.error('Error details:', {
                status: err.response?.status,
                data: err.response?.data,
                message: err.message
            });
        }
        console.error(err);
        return {
            success: false,
            message: err instanceof Error ? err.message : 'Request failed',
            data: null
        } as HTTPResponse;
    }
}