import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Di Next.js 16, fungsi utama diexport dengan nama `proxy`
export const proxy = auth((req: NextRequest & { auth?: any }) => {
  const pathname = req.nextUrl?.pathname || "";
  const isLoggedIn = !!req.auth;

  const isDashboardAdmin = pathname.startsWith("/dashboard/admin");

  if (isDashboardAdmin && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/admin/:path*"],
};