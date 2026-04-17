import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const isLogin = !!token;
     if (!isLogin) {
        if (
            pathname.startsWith("/admin") ||
            pathname.startsWith("/editor") ||
            pathname.startsWith("/members")
        ) {
            const loginUrl = new URL("/auth/login", request.url);
            loginUrl.searchParams.set("redirect", pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    // 🔥 Role-based access
    if (pathname.startsWith("/admin")) {
        if (token?.role !== "admin") {
            return NextResponse.redirect(new URL("/404", request.url));
        }
    }

    if (pathname.startsWith("/editor")) {
        if (token?.role !== "editor") {
            return NextResponse.redirect(new URL("/404", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/editor/:path*", "/produk/:path*"],
};