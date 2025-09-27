// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const userCookie = req.cookies.get("user")?.value;

  const protectedRoutes = ["/home", "/map"];

  if (protectedRoutes.some((path) => url.pathname.startsWith(path))) {
    if (!userCookie) {
      url.pathname = "/auth";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home/:path*", "/home", "/map/:path*", "/map"],
};
