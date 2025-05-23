import { NextRequest, NextResponse } from 'next/server';
import { getUserToken } from './lib/private/auth';
import routes from './sources/routes';

export async function middleware(request: NextRequest) {
  const token = await getUserToken();
  const { pathname } = request.nextUrl;

  const publicAuthRoutes = [routes.authentication.login, routes.authentication.register];
  const protectedRoutes = [routes.dashboard, routes.authentication.finish];

  if (token && publicAuthRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL(routes.dashboard, request.url));
  }

  if (!token && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL(routes.authentication.login, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/authentication/login',
    '/authentication/register',
    '/dashboard',
    '/authentication/finish',
  ],
};
