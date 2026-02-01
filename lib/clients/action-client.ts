import { createSafeActionClient } from "next-safe-action";
import z from "zod";
import { supabaseClient } from "@/lib/clients/supabase-client";

export const actionClient = createSafeActionClient({
  defineMetadataSchema() {
    return z.object({
      name: z.string(),
    });
  },
  handleServerError(error, { metadata }) {
    console.error(metadata.name, error.message);

    return error.message;
  },
}).use(async ({ next }) => {
  const supabase = await supabaseClient();

  return next({
    ctx: {
      supabase,
    },
  });
});
