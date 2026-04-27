import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import apiFetch from '@/lib/api';
import { AuthDataResponse } from '@/types/auth';
import { HTTPResponse } from '@/types';

export async function POST(request: Request) {
  const body = await request.json();

  const response: HTTPResponse<AuthDataResponse> = await apiFetch(`auth/login`, body, 'POST');
  
  const {data}= response;

  if (response.success && data.refresh_token) {

    // Set cookies
    const cookieStore = await cookies();
    
    cookieStore.set('refresh_token', data.refresh_token, {
      httpOnly: true,      
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'lax',     
      maxAge: 7 * 24 * 60 * 60, // 7 jours
      path: '/',           
    });

    cookieStore.set('user', JSON.stringify(data.user), {
        httpOnly: true,      
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'lax',     
        maxAge: 7 * 24 * 60 * 60, // 7 jours
        path: '/',  
    });
     
    return NextResponse.json({
        access_token: data.access_token, user: data.user
    });
  }
  
  return NextResponse.json(response, { status: response.status ?? 500 });
}
