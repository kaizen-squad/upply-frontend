import axios, { type InternalAxiosRequestConfig } from "axios";
import { HTTPResponse } from '../types/index';
import { useTokenStore } from "@/hooks/store";

/**
 * The opened routes which any client can reach without authorization, except refresh token where the token is checked directly from the http cookie
 */

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const publicAccessRoutes = [
  'login',
  'register',
  'refresh',
]

let isRefreshing = false;
let queue: { resolve: (value: unknown) => void; reject: (reason?: unknown) => void; }[] = [];


/**
 * The instance in charge of all HTTP request across the app
 */

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
    allowAbsoluteUrls: true,
});

/**
 * Intercept each request before it's made and supply the access token regarding the middleware
 * Check https://axios-http.com/docs/interceptors for more info.
 */
instance.interceptors.request.use((config)=> {

    if(config.url && !isNextBackendRoute(config.url)){
        const accessToken = useTokenStore.getState().accessToken; 
        if(accessToken)
            config.headers.Authorization = `Bearer ${accessToken}`
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
        const config = error.config as CustomAxiosRequestConfig;
        if(error.response?.status === 401 && !config._retry && !publicAccessRoutes.find((route)=>error.config.url?.includes(route))) {

            config._retry = true;

            if(isRefreshing){
                return new Promise((resolve, reject)=>{
                    queue.push({resolve, reject});
                }).then(accessToken => {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                    return instance(config);
                }).catch(err => {
                    return Promise.reject(err);
                })
            }
            
            isRefreshing= true;

            try{

                const response = await instance.post('/api/auth/refresh', {}, {baseURL: ''});
                const { accessToken } : { accessToken: string } = response.data;
                
                useTokenStore.setState({accessToken:accessToken});
                queue.forEach(p => p.resolve(accessToken));
                queue = [];
                config.headers.Authorization = `Bearer ${accessToken}`;
                return instance(config)

            }catch(err){

                queue.forEach(p => p.reject());
                queue = [];

                if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
                   window.location.href='/login'; // Redirige vers la page de connexion si le rafraîchissement échoue et que nous ne sommes pas déjà sur la page de connexion
                }
                return Promise.reject(err);
            }
            finally{
                isRefreshing=false;    
            }
        }

        // Retourner l'erreur originale pour les autres cas
        return Promise.reject(error);
});

/**
 * Determines whether a request URL targets a local Next.js route.
 *
 * @param url - Request URL passed to {@link apiFetch}.
 * @returns `true` when the URL starts with `/` and should use the local origin.
 */
const isNextBackendRoute = (url: string) => url.startsWith('/');

/**
 * Sends an HTTP request and returns the response body using the app's common response shape.
 *
 * URLs beginning with `/` target local Next.js routes; other URLs target the configured
 * external backend. Request failures are converted into an unsuccessful `HTTPResponse`
 * rather than being thrown to the caller.
 *
 * @typeParam T - Type of the successful response data.
 * @param url - Local or external endpoint to request.
 * @param body - Optional request body.
 * @param method - HTTP method; defaults to `GET`.
 * @returns The response body or a normalized error response.
 */
export default async function apiFetch<T> (url: string, body?: object | undefined,  method?: 'GET'| 'POST'| 'PUT'| 'PATCH' | 'DELETE'): Promise<HTTPResponse<T>> {

    if(!method)
        method = 'GET';

    const requestConfig: Omit<InternalAxiosRequestConfig, 'headers'> = {
        url,
        method,
        data: body,
    };

    if (isNextBackendRoute(url)) {
        requestConfig.baseURL = '';
    }

    try {
        const response = await instance(requestConfig);
        return response.data as HTTPResponse<T>;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const response = err.response;            
            return {
                success: false,
                data: null,
                message: response?.data?.message ?? err.message,
                status: response?.status ?? (err.code === 'ECONNABORTED' ? 408 : 503),
            };
        }

        return {
            success: false,
            data: null,
            message: err instanceof Error ? err.message : 'Unexpected error',
            status: 500,
        };
    }
}
