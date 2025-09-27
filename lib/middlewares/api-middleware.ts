import { type NextRequest, NextResponse } from "next/server";

export default function ApiMiddleware(request: NextRequest) {
  const url = request.nextUrl;
  const pathname = url.pathname;
  const searchParams = url.searchParams;
  const path = `${pathname === "/" ? "" : pathname}${searchParams ? `?${searchParams}` : ""}`;

  const response = NextResponse.rewrite(new URL(`/api${path}`, request.url));

  return response;
}
