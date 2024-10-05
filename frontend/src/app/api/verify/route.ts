import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { proof, merkle_root, nullifier_hash, verification_level } = body;

    if (!proof || !merkle_root || !nullifier_hash || !verification_level) {
      throw new Error('Missing required fields');
    }


    // If verification is successful, proceed with setting the cookie
    const tokenValue = JSON.stringify({ verification_level, nullifier_hash });

    const response = NextResponse.json({ verified: true }, { status: 200 });
    
    response.cookies.set('auth_token', tokenValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 600 // 10 minutes in seconds
    });

    return response;

  } catch (error) {
    console.error('Verification error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else {
      return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
  }
}