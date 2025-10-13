import { type NextRequest, NextResponse } from "next/server";
import { VALID_HOME_ROUTES } from "@/lib/constants";

export default function HomeMiddleware(request: NextRequest) {
  const url = request.nextUrl;
  const pathname = url.pathname;
  const searchParams = url.searchParams;
  const path = `${pathname === "/" ? "" : pathname}${searchParams ? `?${searchParams}` : ""}`;

  if (!VALID_HOME_ROUTES.includes(pathname)) {
    return NextResponse.rewrite(new URL("/novulse/not-found", request.url));
  }

  return NextResponse.rewrite(new URL(`/home${path}`, request.url));
}
