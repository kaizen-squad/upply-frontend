import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import apiFetch from '@/lib/api';
import { AuthDataResponse, UserCookieSchema } from '@/types/auth';
import { HTTPResponse } from '@/types';

/**
 * Authenticates credentials through the backend and stores the session cookies on success.
 *
 * @param request - Incoming request containing the login payload as JSON.
 * @returns The backend authentication response, with the refresh token removed from its data.
 */
export async function POST(request: Request) {
  const body = await request.json();

  const response: HTTPResponse<AuthDataResponse> = await apiFetch(`api/login`, body, 'POST');
  const refreshToken = response.success ? response.data.refreshToken : undefined;
  
  if (response.success && refreshToken) {
    const { data } = response;
    // Set cookies
    const cookieStore = await cookies();
    
    cookieStore.set('refreshToken', refreshToken, {
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
     delete data.refreshToken;
    return NextResponse.json(response);
  }
  
  return NextResponse.json(response);
}


/**
 * Returns the validated user stored in the session cookie, clearing invalid session cookies.
 *
 * @returns A JSON response containing the user when the cookie is valid.
 */
export async function GET(){
  const cookiestore = await cookies();
  const userCookie = cookiestore.get('user');
  if(userCookie){
    try {
      const user = UserCookieSchema.safeParse(JSON.parse(userCookie.value));
      if (user.success) {        
        return NextResponse.json({success:true, data:user.data, message:'User info'});
      }
    } catch {
      // Invalid cookie contents are handled as an expired session.
    }

    cookiestore.delete('user');
    cookiestore.delete('refreshToken');
  }

  return NextResponse.json({success:false});
}
