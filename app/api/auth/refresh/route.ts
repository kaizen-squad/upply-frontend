// app/api/auth/refresh/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import apiFetch from '@/lib/api';
import { HTTPResponse } from '@/types';
import { RefreshTokenResponse } from '@/types/auth';

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refresh_token')?.value;
  
  if (!refreshToken) {
    return NextResponse.json(
      { message: 'No refresh token' },
      { status: 401 }
    );
  }
  
  // Call the backend to refresh the tokens
  const response:HTTPResponse<RefreshTokenResponse> = await apiFetch(`refresh`, {refresh_token: refreshToken}, 'POST');
    
  const { data } = response;

  if (response.success) {
    return NextResponse.json({
      access_token: data.access_token
    });
  }
  
  //Delete the cookie the previous request result in success.
  cookieStore.delete('refresh_token');
  
  return NextResponse.json(
    { message: 'Refresh failed' },
    { status: 401 }
  );
}