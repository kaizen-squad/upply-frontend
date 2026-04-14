import apiFetch from "@/lib/api"
import { setAccessToken, setRefreshToken } from "@/lib/auth"
import { LoginProps, RegisterProps } from "@/types/auth"
import { AuthResponse } from '../types/auth';
import { redirect } from "next/navigation";
import useNotificationManager from "@/components/ui/Notification/hooks/useNotificationManager";
import { HTTPResponse } from "@/types";
import { destroycookies } from '../lib/auth';
import useUserStore from "./store";


/**
 * The hook used to manage the authentication.
 * It defines the :
 * login method: fires to hit the auth/login endpoint and log in the user
 * register method: fires to hit the auth/register endpoint and log in the user
 * logout method: clean the token's cookies and redirect to login
 * @returns 
 */
export const useAuth = () =>{

    const {setUser} = useUserStore();
    const { notify } = useNotificationManager();

    const getLoggedIn = (response: HTTPResponse)=> {
        const { success, message } = response;
        const data:AuthResponse = response.data;

        if(success){
            try{
                setAccessToken(data.access_token);
                setRefreshToken(data.refresh_token);
                setUser(data.user);

                redirect(`${data.user.role}/dashboard`)
            }catch(err){
                logout();
                throw(err);
            }
            
        }

        notify(message, 'error');
    }

    const login = async(body:LoginProps) => {
        const response = await apiFetch('auth/login', body, 'POST');
        getLoggedIn(response)
    }

    const register = async (body: RegisterProps) =>{
        const response = await apiFetch('auth/register', body, 'POST');
        getLoggedIn(response);
    }

    const logout = ()=> {
        destroycookies();
        setUser(undefined);
        redirect('auth/login');
    }

    return { login, register, logout }
}
