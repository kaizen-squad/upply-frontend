import { cookies } from "next/headers"
import apiFetch from "./api";

export const setAccessToken=async (token: string)=>{
    const cookieStore = await cookies();

    cookieStore.set('access_token', token, {
        httpOnly: true,
        secure: true,
        sameSite:'lax',
        path:'/api',
        maxAge: 60 * 60
    });
}

export const setRefreshToken = async (token: string)=>{
    const cookieStore = await cookies();

    cookieStore.set('refresh_token', token, {
        httpOnly: true,
        secure: true,
        sameSite:'lax',
        path:'/api',
        maxAge: 60 * 60 * 24
    });
}


export const getToken = async () => {
    const cookieStore = await cookies();
    
    return cookieStore.get('access_token')?.value;
}

export const refreshToken = async() => {
    try{
        const res =  await apiFetch('/refresh-token');
        const {accessToken, refreshToken} = res.data;
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);

        return accessToken;
        
    }catch(err){
        throw err;
    }
}