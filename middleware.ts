import { NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role;

  // API routes should be handled by NextAuth directly
  if (nextUrl.pathname.startsWith(apiAuthPrefix)) {
    return NextResponse.next();
  }

  // Public routes are accessible to everyone
  if (publicRoutes.includes(nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Auth routes redirect to dashboard if already logged in
  if (authRoutes.includes(nextUrl.pathname)) {
    if (isLoggedIn) {
      return NextResponse.redirect(
        new URL(
          userRole === "ADMIN"
            ? DEFAULT_LOGIN_REDIRECT.ADMIN
            : DEFAULT_LOGIN_REDIRECT.USER,
          nextUrl.origin
        )
      );
    }
    return NextResponse.next();
  }

  // Admin routes are only accessible to admins
  if (nextUrl.pathname.startsWith("/admin")) {
    if (!isLoggedIn || userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/auth/login", nextUrl.origin));
    }
    return NextResponse.next();
  }

  // Protected routes require authentication
  if (!isLoggedIn) {
    const callbackUrl = encodeURIComponent(nextUrl.pathname + nextUrl.search);
    return NextResponse.redirect(
      new URL(`/auth/login?callbackUrl=${callbackUrl}`, nextUrl.origin)
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
