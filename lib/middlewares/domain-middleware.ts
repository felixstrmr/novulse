import type { JwtPayload } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";

export function domainMiddleware(
  request: NextRequest,
  response: NextResponse,
  user: JwtPayload | undefined
) {
  const url = request.nextUrl;
  const pathname = url.pathname;
  const searchParams = url.searchParams;
  const path = `${pathname === "/" ? "" : pathname}${searchParams ? `?${searchParams}` : ""}`;

  const hostname = request.headers.get("host");

  if (!user && pathname !== "/signin") {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  const rewriteUrl = new URL(`/${hostname}${path}`, request.url);
  const rewriteResponse = NextResponse.rewrite(rewriteUrl, response);

  return rewriteResponse;
}
