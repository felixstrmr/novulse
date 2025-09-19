import { type NextRequest, NextResponse } from "next/server";
import { PUBLIC_APP_ROUTES, VALID_APP_ROUTES } from "@/lib/constants";
import type { Session } from "@/types";

export default function AppMiddleware(
  request: NextRequest,
  session: Session | null
) {
  const url = request.nextUrl;
  const pathname = url.pathname;
  const searchParams = url.searchParams;
  const path = `${pathname === "/" ? "" : pathname}${searchParams ? `?${searchParams}` : ""}`;

  if (!VALID_APP_ROUTES.includes(pathname)) {
    return NextResponse.rewrite(new URL("/novulse/not-found", request.url));
  }

  if (!(session || PUBLIC_APP_ROUTES.includes(pathname))) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.rewrite(new URL(`/app${path}`, request.url));
}
