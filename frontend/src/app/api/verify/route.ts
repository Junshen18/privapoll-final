import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const proof = await request.json();
    console.log(proof)
    // Here you would typically verify the Worldcoin proof
    // For now, we'll just return a success response
    return NextResponse.json({ verified: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Verification failed' }, { status: 400 });
  }
}