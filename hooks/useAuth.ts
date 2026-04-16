import apiFetch from "@/lib/api"
import { LoginProps, RegisterProps } from "@/types/auth"
import { AuthResponse } from '../types/auth';
import useNotificationManager from "@/components/ui/Notification/hooks/useNotificationManager";
import { HTTPResponse } from "@/types";
import  { useTokenStore } from "./store";
import { useRouter } from "next/router";


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

    const getLoggedIn = (response: HTTPResponse)=> {
        const { success, message } = response;
        const data:AuthResponse = response.data;

        if(success){
            try{
                useTokenStore.setState({access_token:data.access_token});

                useRouter().push(`/${data.user.role}/dashboard`);
                
            }catch(err){
                throw(err);
            }   
        }else 
            notify(message, 'error');
    }

    const login = async(body:LoginProps) => {
        const response = await apiFetch('api/auth/login', body, 'POST');
        if(response)
            getLoggedIn(response)
        else
            notify('Login Failed: An unexpected error occured.', 'error')
    }

    const register = async (body: RegisterProps) =>{
        const response = await apiFetch('api/auth/register', body, 'POST');
        
        if(response)
            getLoggedIn(response)
        else
            notify('Registration Failed: An unexpected error occured.', 'error')
    }

    const logout = async () =>{
        try{
            const response = await apiFetch('/api/auth/logout', {}, 'POST');
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

    return { login, register, logout }
}
