import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('auth_token')

  if (!authToken) {
    if (request.nextUrl.pathname === '/') {
      return NextResponse.redirect(new URL('/welcome', request.url))
    }
    if (['/votinglists', '/createvote'].includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/welcome', request.url))
    }
  }

  if (authToken && request.nextUrl.pathname === '/welcome') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/login', '/votinglists', '/createvote'],
}