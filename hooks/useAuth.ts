import apiFetch from "@/lib/api"
import { setAccessToken, setRefreshToken } from "@/lib/utils"
import { LoginProps } from "@/types/auth"
import { LoginResponse } from '../types/auth';
import { redirect } from "next/navigation";
import useNotificationManager from "@/components/ui/Notification/hooks/useNotificationManager";

const useAuth = () =>{
    const login = async(body:LoginProps) => {
        const response = await apiFetch('auth/login', body);
        const {success, message} = response;
        const data:LoginResponse = response.data;
        const {notify} = useNotificationManager();

        if(success){
            setAccessToken(data.access_token);
            setRefreshToken(data.refresh_token);
            redirect(`${data.user.role}/dashboard`)
        }

        notify(message, 'error');
    }

}
