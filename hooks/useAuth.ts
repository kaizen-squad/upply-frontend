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
            

        if(success){
            try{
                useTokenStore.setState({accessToken:data.accessToken});
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
            const response: HTTPResponse<AuthDataResponse> = await apiFetch(`/api/auth/login`, body, 'POST');
                
            if(response){
                if(response.status === 401){
                    notify('Invalid email or password.', 'error');
                }else{
                    getLoggedIn(response)
                }
            }
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
            const response: HTTPResponse<AuthDataResponse> = await apiFetch(`/api/auth/register`, body, 'POST');
            if(response.success){
                notify('Registration successful! You can now log in.', 'success');
                router.push('/login');
            }else{
                if(response.status === 422){
                    notify('Email ou phone number already in use!', 'error');
                }else{
                    notify(response.message, 'error');
                }
                
            }
        }catch(err){
            notify('The server results in error while registering!', 'error');
        }finally{
            setLoading(false);
        }
        
        
    }

    const logout = async () =>{
        try{
            const response = await apiFetch(`api/logout`);
            
            if(response.success){
                const deleteCookie = await apiFetch('/api/auth/logout')
                if(deleteCookie.success)
                    router.push('/login');
            }else{
               return notify('An unexpected error occured.', 'error');            
            }
        }catch(err){
            notify('The server results in error while logging out!', 'error');
        }
    }

    return { login, register, logout, loading }
}
