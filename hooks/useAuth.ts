'use client'
import apiFetch from "@/lib/api"
import { LoginProps, RegisterProps } from "@/types/auth"
import { AuthDataResponse } from '../types/auth';
import { HTTPResponse } from "@/types";
import  { useTokenStore, useUserStore } from "./store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToasting } from "@/components/ui/Toast/useToasting";

/**
 * The hook used to manage the authentication.
 * It defines the :
 * login method: fires to hit the auth/login endpoint and log in the user
 * register method: fires to hit the auth/register endpoint and log in the user
 * logout method: clean the token's cookies and redirect to login
 * @returns 
 */
export const useAuth = () =>{
    const {notify} = useToasting();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const getLoggedIn = (response: HTTPResponse<AuthDataResponse>)=> {
        const { success, message } = response;
        const data:AuthDataResponse | null= response.data;
            
        console.debug('[useAuth] getLoggedIn', { success, message, user: data?.user });

        if(success){
            try{
                useTokenStore.setState({accessToken:data.accessToken});
                useUserStore.setState({user: data.user});
                console.debug('[useAuth] redirecting to dashboard', `/${data.user.role}/dashboard`);
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
            console.debug('[useAuth] login request', body);
            const response: HTTPResponse<AuthDataResponse> = await apiFetch(`/api/auth/login`, body, 'POST');
            console.debug('[useAuth] login response', response);
            if(response)
                getLoggedIn(response)
            else
                notify('Login Failed: An unexpected error occured.', 'error')
        }catch(err){
            console.error('[useAuth] login error', err);
            notify('The server results in error while logging in!', 'error');
        }finally{
            setLoading(false)
        }
    }

    const register = async (body: RegisterProps) =>{
        try{
            setLoading(true)
            console.debug('[useAuth] register request', body);
            const response: HTTPResponse<AuthDataResponse> = await apiFetch(`/api/auth/register`, body, 'POST');
            console.debug('[useAuth] register response', response);
            if(response.success){
                notify('Registration successful! You can now log in.', 'success');
                console.debug('[useAuth] redirecting to login after register');
                router.push('/login');
            }else{
                notify(response.message, 'error');
            }
               
        }catch(err){
            console.error('[useAuth] register error', err);
            notify('The server results in error while registering!', 'error');
        }finally{
            setLoading(false);
        }
        
        
    }

    const logout = async () =>{
        try{
            console.log('[useAuth] logout request');
            const response = await apiFetch(`api/logout`);
            console.log('[useAuth] logout response', response);
            
            if(response.success){
                const deleteCookie = await apiFetch('/api/auth/logout')
                if(deleteCookie.success)
                    router.push('/login');
            }else{
               return notify('An unexpected error occured.', 'error');            

            }
        }catch(err){
            console.error('[useAuth] logout error', err);
            notify('The server results in error while logging out!', 'error');
        }
    }

    return { login, register, logout, loading }
}
