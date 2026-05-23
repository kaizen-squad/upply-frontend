// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {

  const cookieStore = await cookies();
  // Delete the cookies
  cookieStore.delete('refreshToken');
  cookieStore.delete('user');

  return NextResponse.json({ success: true });
}
  
