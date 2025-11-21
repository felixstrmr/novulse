import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";
import { appMiddleware } from "@/lib/middlewares/app-middleware";
import { domainMiddleware } from "@/lib/middlewares/domain-middleware";
import { homeMiddleware } from "@/lib/middlewares/home-middleware";
import type { Database } from "@/types/supabase";

export async function proxy(request: NextRequest) {
  const hostname = request.headers.get("host");

  if (hostname === `www.${env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    return homeMiddleware(request);
  }

  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value } of cookiesToSet) {
            request.cookies.set(name, value);
          }
          response = NextResponse.next({
            request,
          });
          for (const { name, value } of cookiesToSet) {
            response.cookies.set(name, value);
          }
        },
      },
    }
  );

  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  if (hostname === `app.${env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    return appMiddleware(request, response, user);
  }

  return domainMiddleware(request, response, user);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
