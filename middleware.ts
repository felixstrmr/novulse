import type { NextRequest } from "next/server";
import { env } from "@/lib/env";
import ApiMiddleware from "@/lib/middlewares/api-middleware";
import AppMiddleware from "@/lib/middlewares/app-middleware";
import HomeMiddleware from "@/lib/middlewares/home-middleware";
import WorkspaceMiddleware from "@/lib/middlewares/workspace-middleware";
import { getSession } from "@/queries/sessions";

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get("host");

  if (hostname === `www.${env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    return HomeMiddleware(request);
  }

  if (hostname === `api.${env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    return ApiMiddleware(request);
  }

  const session = await getSession();

  if (hostname === `app.${env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    return AppMiddleware(request, session);
  }

  return WorkspaceMiddleware(request, session);
}

export const config = {
  runtime: "nodejs",
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
