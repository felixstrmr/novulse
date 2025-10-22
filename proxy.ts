import type { NextRequest } from "next/server";
import supabaseMiddlewareClient from "@/lib/clients/supabase-middleware-client";
import { env } from "@/lib/env";
import DashboardMiddleware from "@/lib/middlewares/dashboard-middleware";
import HomeMiddleware from "@/lib/middlewares/home-middleware";
import WorkspaceMiddleware from "@/lib/middlewares/workspace-middleware";

export async function proxy(request: NextRequest) {
  const hostname = request.headers.get("host");

  if (hostname === `www.${env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    return HomeMiddleware(request);
  }

  const { user, response } = await supabaseMiddlewareClient(request);

  if (hostname === `dashboard.${env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    return DashboardMiddleware(request, user, response);
  }

  return WorkspaceMiddleware(request, user, response);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
