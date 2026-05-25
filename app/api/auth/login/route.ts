import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import apiFetch from '@/lib/api';
import { AuthDataResponse } from '@/types/auth';
import { HTTPResponse } from '@/types';

export async function POST(request: Request) {
  const body = await request.json();

  const response: HTTPResponse<AuthDataResponse> = await apiFetch(`api/login`, body, 'POST');
  
  const {data}= response;

  if (response.success && data.refreshToken) {
    // Set cookies
    const cookieStore = await cookies();
    
    cookieStore.set('refreshToken', data.refreshToken, {
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
     delete response.data.accessToken;
    return NextResponse.json(response);
  }
  
  return NextResponse.json(response);
}


export async function GET(){
  const cookiestore = await cookies();
  let user = cookiestore.get('user');
  if(user){
    user = JSON.parse(user?.value as string);
    return NextResponse.json({success:true, data:user, message:'User info'});
  }else{
    NextResponse.json({success:false});
  }
}