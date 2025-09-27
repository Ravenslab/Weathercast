// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const userCookie = req.cookies.get('user')?.value;

  // List of protected routes
  const protectedRoutes = ['/home', '/map'];

  if (protectedRoutes.some((path) => url.pathname.startsWith(path))) {
    if (!userCookie) {
      url.pathname = '/auth'; // redirect to login
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// apply middleware to protected paths
export const config = {
  matcher: ['/home/:path*', '/map/:path*'],
};
