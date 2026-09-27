// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import apiFetch from '@/lib/api';
import { HTTPResponse } from '@/types';
import { AuthDataResponse } from '@/types/auth';

export async function POST(request: Request) {
    
  const body = await request.json();
  
  const response: HTTPResponse<AuthDataResponse> = await apiFetch(`api/register`, body, 'POST');
  const refreshToken = response.success ? response.data.refreshToken : undefined;
  
  if (response.success && refreshToken) {
    const { data } = response;
    //Configure the cookies needed for the user session
    const cookieStore = await cookies();
    
    cookieStore.set('refreshToken', refreshToken, {
      httpOnly: true,      
      secure: process.env.NODE_ENV === 'production', // HTTPS in prod
      sameSite: 'lax',     
      maxAge: 7 * 24 * 60 * 60, // 7 jours
      path: '/',           
    });

    cookieStore.set('user', JSON.stringify(data.user), {
        httpOnly: true,      
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'lax',     
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: '/',  
    });
    
    // return only the accessToken 
    return NextResponse.json({
        accessToken: data.accessToken, user: data.user
    });
  }
  
  return NextResponse.json(response);
}
