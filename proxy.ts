// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { User } from './types/auth';


export async function proxy(request: NextRequest) {
  const refreshToken = request.cookies.get('refreshToken');
  const isLoggedIn = !!refreshToken;
  
  const { pathname } = request.nextUrl;
  
  // Routes publiques
  const publicPaths = ['/login', '/register'];
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));
  
  // Routes protégées par rôle
  const clientRoutes = ['/client'];
  const prestataireRoutes = ['/prestataire'];
  
  // 1. Non authentifié sur route protégée entraine redirection login
  if (!isLoggedIn && !isPublicPath) {
    console.debug('[middleware] not logged in, redirect to /login', pathname);
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // 2. Authentifié sur route publique entraine redirection dashboard
  if (isLoggedIn && isPublicPath) {
    console.debug('[middleware] logged in on public page, redirect to dashboard', pathname);
    // Récupérer le rôle depuis un cookie (défini au login)
    const userCookie= request.cookies.get('user')?.value;

    if(userCookie){
      const user: User = JSON.parse(userCookie);
      if (user && user.role === 'client') {
        return NextResponse.redirect(new URL('/client', request.url));
      } else if (user.role === 'prestataire') {
          return NextResponse.redirect(new URL('/prestataire', request.url));
      }
    }
    // Fallback: logout si pas de rôle
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('refreshToken');
    response.cookies.delete('user');
    return response;
  }
  
  // 3. Vérification des rôles sur routes spécifiques
  if (isLoggedIn) {
    const userCookie = request.cookies.get('user')?.value;
    if(userCookie){
       const user: User = JSON.parse(userCookie);

        // Client essayant d'accéder à une route prestataire
      if (user.role === 'client' && prestataireRoutes.some(route => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL('/client', request.url));
      }
    
      // Prestataire essayant d'accéder à une route client
      if (user.role === 'prestataire' && clientRoutes.find(route => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL('/prestataire', request.url));
      }
    }else{
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('refreshToken');
        response.cookies.delete('user');
        return response;
    }
  }
     console.log('Access granted to:', pathname);
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|fonts|icons|videos|docs|.*\\.(?:jpg|jpeg|gif|png|svg|webp|ico|css|js|woff|woff2|ttf|eot)).*)',
  ],
};