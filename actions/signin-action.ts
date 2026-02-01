"use server";

import { actionClient } from "@/lib/clients/action-client";
import { signinSchema } from "@/schemas/signin-schema";

export const signinAction = actionClient
  .metadata({ name: "signinAction" })
  .inputSchema(signinSchema)
  .action(async ({ ctx, parsedInput }) => {
    const { supabase } = ctx;
    const { email, password } = parsedInput;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }
  });
