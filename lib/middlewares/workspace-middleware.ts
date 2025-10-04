import type { User } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";

export default function WorkspaceMiddleware(
  request: NextRequest,
  user: User | null,
  response: NextResponse
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
