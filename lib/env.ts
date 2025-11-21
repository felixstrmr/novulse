import z from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_ROOT_DOMAIN: z.string(),
  NEXT_PUBLIC_SUPABASE_URL: z.string(),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string(),
});

export const env = envSchema.parse(process.env);
