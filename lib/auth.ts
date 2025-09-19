import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { admin, organization } from "better-auth/plugins";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { env } from "@/lib/env";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema,
  }),

  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },

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

  plugins: [nextCookies(), organization(), admin()],
});
