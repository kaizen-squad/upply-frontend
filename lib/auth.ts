import { cookies } from "next/headers"
import apiFetch from "./api";

/**
 * Set the Access token by storing it inside a httpOnly cookie.
 * @param token the access_token
 */
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

/**
 * Set the refresh token by storing it inside a httpOnly cookie.
 * @param token the refresh_token
 */

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

/**
 * Get the access_token by reading the corresponding cookie.
 * @returns the access_Token: string
 */
export const getToken = async () => {
    const cookieStore = await cookies();
    
    return cookieStore.get('access_token')?.value;
}

/**
 * Fires to refresh the access token when it expires.
 * @returns the access_token refreshed.
 */
export const refreshToken = async() => {
    try{
        const res =  await apiFetch('/refresh-token');
        const {access_token, refresh_token} = res.data;
        setAccessToken(access_token);
        setRefreshToken(refresh_token);

        return access_token;

    }catch(err){
        throw err;
    }
}

/**
 * When fires, destoy the access and refresh tokens cookies.
 */

export const destroycookies = async ()=>{
    const cookieStore = await cookies();
    try{
        cookieStore.delete('access_token').delete('refresh_token');
    }catch(err){
        throw `Error deleting cookies: ${err}`;
    }
    
}