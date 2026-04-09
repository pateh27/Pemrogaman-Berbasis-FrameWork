import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const loginCookie = request.cookies.get("isLogin")?.value;
    const isLogin = loginCookie === "true";
    const isProtectedRoute = pathname.startsWith("/produk");

    if (isProtectedRoute && !isLogin) {
        const loginUrl = new URL("/auth/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/produk/:path*"],
};