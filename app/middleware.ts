import useUserStore from '@/hooks/store';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type {User} from '@/types/auth'
import apiFetch from '@/lib/api';


/**
 * Check the right to access a route by the current user regarding his role.
 * @param request The current request
 * @returns 
 */

export async function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get('refresh_token');
  const isLoggedIn = !!refreshToken;
  
  const { pathname } = request.nextUrl;
  
  // Public routes
  const publicPaths = ['/login', '/register'];
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));
    
  if (!isLoggedIn && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  if (isLoggedIn && isPublicPath) {
    // Redirect regarding the role stored in userStore
   
    const user = await getUser();

    if(user){

      useUserStore.setState({user: user});      
      const dashboardPath = `${user.role}/dashboard`;
      return NextResponse.redirect(new URL(dashboardPath, request.url));

    }else{
      try{
        await apiFetch('api/logout', {}, 'POST');
      }catch(err){
          throw err
      }finally{
        if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
      }
    }
  }
  
  return NextResponse.next();
}

/**
 * Check the user cookie and store his value in the user store if it has not expired.
 * @returns user : the user info stored in the in a cookie
 */
const getUser = async () => {
    let user:User|undefined = useUserStore.getState().user;

    if(!user){
      const userCookie: string | undefined = (await cookies()).get('user')?.value;
      
      if(userCookie)
        user = JSON.parse(userCookie);
    }

    return user

}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};