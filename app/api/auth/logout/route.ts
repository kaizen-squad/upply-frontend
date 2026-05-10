// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import apiFetch from '@/lib/api';

export async function POST() {

  const cookieStore = await cookies();
  const response = await apiFetch('logout', {}, 'POST')  
    
  if(response.success){
    // Delete the cookies
    cookieStore.delete('refresh_token');
    cookieStore.delete('user');

    return NextResponse.json({ success: true });
  }
  
  return NextResponse.json(response);

}