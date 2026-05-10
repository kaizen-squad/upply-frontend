'use client'
import apiFetch from "@/lib/api"
import { LoginProps, RegisterProps } from "@/types/auth"
import { AuthDataResponse } from '../types/auth';
import useNotificationManager from "@/components/ui/Notification/hooks/useNotificationManager";
import { HTTPResponse } from "@/types";
import  { useTokenStore, useUserStore } from "./store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { configDotenv } from "dotenv";

configDotenv(); // Load environment variables from .env file

/**
 * The hook used to manage the authentication.
 * It defines the :
 * login method: fires to hit the auth/login endpoint and log in the user
 * register method: fires to hit the auth/register endpoint and log in the user
 * logout method: clean the token's cookies and redirect to login
 * @returns 
 */
export const useAuth = () =>{
    const { notify } = useNotificationManager();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const getLoggedIn = (response: HTTPResponse<AuthDataResponse>)=> {
        const { success, message } = response;
        const data:AuthDataResponse | null= response.data;
            
        if(success){
            try{
                useTokenStore.setState({access_token:data.access_token});
                useUserStore.setState({user: data.user});
                router.push(`/${data.user.role}/dashboard`);
                
            }catch(err){
                throw(err);
            }   
        }else 
            notify(message, 'error');
    }

    const login = async(body:LoginProps) => {
        try{
            setLoading(true);
            const response: HTTPResponse<AuthDataResponse> = await apiFetch(`${process.env.NEXT_PUBLIC_API_BFF}/api/auth/login`, body, 'POST');
            if(response)
                getLoggedIn(response)
            else
                notify('Login Failed: An unexpected error occured.', 'error')
        }catch(err){
            notify('The server results in error while logging in!', 'error');
        }finally{
            setLoading(false)
        }
    }

    const register = async (body: RegisterProps) =>{
        try{
            setLoading(true)
            const response: HTTPResponse<AuthDataResponse> = await apiFetch(`${process.env.NEXT_PUBLIC_API_BFF}/api/auth/register`, body, 'POST');
           
            if(response)
                getLoggedIn(response);
            else
                notify('Registration Failed: An unexpected error occured.', 'error');

        }catch(err){
            notify('The server results in error while registering!', 'error');
        }finally{
            setLoading(false);
        }
        
        
    }

    const logout = async () =>{
        try{
            const response = await apiFetch(`${process.env.NEXT_PUBLIC_API_BFF}/api/auth/logout`, {}, 'POST');
            if(!response){
                notify('An unexpected error occured.', 'error')
            }
        }catch(err){
            throw err
        }finally{
            if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
                window.location.href = '/login';
            }
        }
    }

    return { login, register, logout, loading }
}
