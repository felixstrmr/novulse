"use server";

import { updateTag } from "next/cache";
import { authActionClient } from "@/lib/clients/action-client";
import { supabaseClient } from "@/lib/clients/supabase-client";
import { addClientSchema } from "@/schemas/add-client-schema";

export const addClientAction = authActionClient
  .metadata({ name: "addClientAction" })
  .inputSchema(addClientSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { name, slug, is_active } = parsedInput;
    const { domain, workspaceId } = await ctx;

    const id = crypto.randomUUID();

    const supabase = await supabaseClient();
    await supabase
      .from("clients")
      .insert({
        id,
        name,
        slug,
        is_active,
        workspace: workspaceId,
      })
      .throwOnError();

    updateTag(`clients:${domain}`);

    return { id };
  });
