import { NextRequest, NextResponse } from "next/server";
import { isValidSessionCookie, sessionCookieName } from "@/lib/auth";

// Protege tudo em /admin, exceto a própria página de login.
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    const cookie = request.cookies.get(sessionCookieName())?.value;
    if (!(await isValidSessionCookie(cookie))) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
