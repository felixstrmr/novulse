"use server";

import { authActionClient } from "@/lib/clients/action-client";
import { supabaseClient } from "@/lib/clients/supabase-client";

export const signoutAction = authActionClient
  .metadata({ name: "signout-action" })
  .action(async () => {
    const supabase = await supabaseClient();

    await supabase.auth.signOut();
  });
