import type { JwtPayload } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { VALID_APP_ROUTES } from "@/lib/constants";

export function appMiddleware(
  request: NextRequest,
  response: NextResponse,
  user: JwtPayload | undefined
) {
  const url = request.nextUrl;
  const pathname = url.pathname;
  const searchParams = url.searchParams;
  const path = `${pathname === "/" ? "" : pathname}${searchParams ? `?${searchParams}` : ""}`;

  if (!VALID_APP_ROUTES.includes(pathname)) {
    return NextResponse.rewrite(new URL("/novulse/not-found", request.url));
  }

  if (!user && pathname !== "/signin") {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  const rewriteUrl = new URL(`/app${path}`, request.url);
  const rewriteResponse = NextResponse.rewrite(rewriteUrl, response);

  return rewriteResponse;
}
