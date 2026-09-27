// app/api/auth/refresh/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import apiFetch from '@/lib/api';
import { HTTPResponse } from '@/types';
import { RefreshTokenResponse } from '@/types/auth';
import { success } from 'zod';

/**
 * Exchanges the refresh token cookie for a new access token through the backend.
 *
 * @returns The refreshed token response, or a 401 response when no refresh cookie exists.
 */
export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;
  
  if (!refreshToken) {
    return NextResponse.json(
      { message: 'No refresh token' },
      { status: 401 }
    );
  }
  
  // Call the backend to refresh the tokens
  const response:HTTPResponse<RefreshTokenResponse> = await apiFetch(`api/refresh`, {tokenString: refreshToken}, 'POST');
  if (response.success) {
    
    return NextResponse.json(response);
  }
  
  //Delete the cookie the previous request result in success.
  cookieStore.delete('refreshToken');
  
  return NextResponse.json(
    response
  );
}
