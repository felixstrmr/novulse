"use server";

import { actionClient } from "@/lib/clients/action-client";
import { supabaseClient } from "@/lib/clients/supabase-client";
import { signinSchema } from "@/schemas/signin-schema";

export const signinAction = actionClient
  .metadata({
    name: "signin-action",
  })
  .inputSchema(signinSchema)
  .action(async ({ parsedInput }) => {
    const { email, password } = parsedInput;

    const supabase = await supabaseClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }
  });
