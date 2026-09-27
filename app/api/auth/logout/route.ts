// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/**
 * Clears the local refresh-token and user cookies.
 *
 * @returns A JSON success response after clearing the cookies.
 */
export async function GET() {

  const cookieStore = await cookies();
  // Delete the cookies
  cookieStore.delete('refreshToken');
  cookieStore.delete('user');

  return NextResponse.json({ success: true });
}
  
