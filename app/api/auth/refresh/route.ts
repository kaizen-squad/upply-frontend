// app/api/auth/refresh/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import apiFetch from '@/lib/api';

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
  const response= await apiFetch(`auth/refresh`, {refresh_token: refreshToken}, 'POST');
    
  const { data } : { data:{ access_token: string } } = response;

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