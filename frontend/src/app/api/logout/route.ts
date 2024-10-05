import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = cookies();
  
  // Remove the auth_token cookie
  cookieStore.delete('auth_token');

  return NextResponse.json({ success: true });
}