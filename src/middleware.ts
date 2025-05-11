import { NextRequest, NextResponse } from 'next/server';
import { getUserToken } from './lib/auth';

export async function middleware(request: NextRequest) {
  const token = await getUserToken();
  const { pathname } = request.nextUrl;

  const publicAuthRoutes = ['/auth/login', '/auth/register'];

  if (token && publicAuthRoutes.includes(pathname)) {
    NextResponse.rewrite(new URL('/dashboard', request.url));
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/auth/login', '/auth/register'],
};
