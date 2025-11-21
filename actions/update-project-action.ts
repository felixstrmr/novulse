"use server";

import { updateTag } from "next/cache";
import { authActionClient } from "@/lib/clients/action-client";
import { supabaseClient } from "@/lib/clients/supabase-client";
import { updateProjectSchema } from "@/schemas/update-project-schema";

export const updateProjectAction = authActionClient
  .metadata({ name: "updateProjectAction" })
  .inputSchema(updateProjectSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { id, status } = parsedInput;
    const { domain } = await ctx;

    const supabase = await supabaseClient();
    await supabase
      .from("projects")
      .update({ status })
      .eq("id", id)
      .throwOnError();

    updateTag(`project:${id}`);
    updateTag(`projects:${domain}`);
  });
