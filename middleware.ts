import { headers } from "next/headers";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { env } from "@/lib/env";
import ApiMiddleware from "@/lib/middlewares/api-middleware";
import AppMiddleware from "@/lib/middlewares/app-middleware";
import HomeMiddleware from "@/lib/middlewares/home-middleware";
import OrganizationMiddleware from "@/lib/middlewares/organization-middleware";

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get("host");

  if (hostname === `www.${env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    return HomeMiddleware(request);
  }

  if (hostname === `api.${env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    return ApiMiddleware(request);
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (hostname === `app.${env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    return AppMiddleware(request, session);
  }

  return OrganizationMiddleware(request, session);
}

export const config = {
  runtime: "nodejs",
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
