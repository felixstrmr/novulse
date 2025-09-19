import { type NextRequest, NextResponse } from "next/server";
import type { Session } from "@/types";

export default function OrganizationMiddleware(
  request: NextRequest,
  session: Session | null
) {
  const url = request.nextUrl;
  const pathname = url.pathname;
  const searchParams = url.searchParams;
  const path = `${pathname === "/" ? "" : pathname}${searchParams ? `?${searchParams}` : ""}`;

  const hostname = request.headers.get("host");

  if (!session && pathname !== "/signin") {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.rewrite(new URL(`/${hostname}${path}`, request.url));
}
