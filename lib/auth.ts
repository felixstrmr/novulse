import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/db";
import { env } from "@/lib/env";
import { protocol } from "@/utils";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
  }),

  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },

  secret: env.ENCRYPTION_KEY,
  baseURL: `${protocol}://${env.NEXT_PUBLIC_API_DOMAIN}/auth`,
  advanced: {
    cookiePrefix: "novulse",
    crossSubDomainCookies: {
      enabled: true,
      domain: `.${env.NEXT_PUBLIC_ROOT_DOMAIN}`,
    },
    database: {
      generateId: false,
    },
  },

  plugins: [nextCookies()],
});
