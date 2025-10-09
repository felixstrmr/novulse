import type { User } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { PUBLIC_APP_ROUTES, VALID_APP_ROUTES } from "@/lib/constants";

export default function AppMiddleware(
  request: NextRequest,
  user: User | null,
  response: NextResponse
) {
  const url = request.nextUrl;
  const pathname = url.pathname;
  const searchParams = url.searchParams;
  const path = `${pathname === "/" ? "" : pathname}${searchParams ? `?${searchParams}` : ""}`;

  if (!VALID_APP_ROUTES.includes(pathname)) {
    return NextResponse.rewrite(new URL("/novulse/not-found", request.url));
  }

  if (!(user || PUBLIC_APP_ROUTES.includes(pathname))) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  const rewriteUrl = new URL(`/app${path}`, request.url);
  const rewriteResponse = NextResponse.rewrite(rewriteUrl, response);

  return rewriteResponse;
}
