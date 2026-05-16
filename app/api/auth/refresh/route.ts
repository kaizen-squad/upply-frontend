// app/api/auth/refresh/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import apiFetch from '@/lib/api';
import { HTTPResponse } from '@/types';
import { RefreshTokenResponse } from '@/types/auth';

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;
  
  if (!refreshToken) {
    return NextResponse.json(
      { message: 'No refresh token' },
      { status: 401 }
    );
  }
  
  // Call the backend to refresh the tokens
  const response:HTTPResponse<RefreshTokenResponse> = await apiFetch(`refresh`, {refreshToken: refreshToken}, 'POST');
    
  const { data } = response;

  if (response.success) {
    return NextResponse.json({
      access_token: data.accessToken
    });
  }
  
  //Delete the cookie the previous request result in success.
  cookieStore.delete('refreshToken');
  
  return NextResponse.json(
    response
  );
}