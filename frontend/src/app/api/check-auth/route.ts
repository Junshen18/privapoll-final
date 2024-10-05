import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = cookies();
  const authToken = cookieStore.get('auth_token');

  if (authToken) {
    try {
      const { verification_level, nullifier_hash } = JSON.parse(authToken.value);
      if (verification_level && nullifier_hash) {
        return NextResponse.json({
          authenticated: true,
          verification_level,
          nullifier_hash
        });
      }
    } catch (error) {
      console.error('Error parsing auth token:', error);
    }
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}