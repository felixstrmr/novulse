"use server";

import { updateTag } from "next/cache";
import { authActionClient } from "@/lib/clients/action-client";
import { supabaseClient } from "@/lib/clients/supabase-client";
import { upsertProjectStatusesSchema } from "@/schemas/upsert-project-statuses-schema";

export const upsertProjectStatusesAction = authActionClient
  .metadata({ name: "upsertProjectStatusesAction" })
  .inputSchema(upsertProjectStatusesSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { statuses } = parsedInput;
    const { domain, workspaceId } = await ctx;

    const supabase = await supabaseClient();

    await supabase
      .from("project_statuses")
      .upsert(
        statuses.map((status) => ({
          ...status,
          workspace: workspaceId,
        })),
        { onConflict: "id" }
      )
      .throwOnError();

    updateTag(`project-statuses:${domain}`);
  });
