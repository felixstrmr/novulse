"use server";

import { updateTag } from "next/cache";
import { authActionClient } from "@/lib/clients/action-client";
import { supabaseClient } from "@/lib/clients/supabase-client";
import { upsertTaskStatusesSchema } from "@/schemas/upsert-task-statuses-schema";

export const upsertTaskStatusesAction = authActionClient
  .metadata({ name: "upsertTaskStatusesAction" })
  .inputSchema(upsertTaskStatusesSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { statuses } = parsedInput;
    const { domain, workspaceId } = await ctx;

    const supabase = await supabaseClient();

    await supabase
      .from("task_statuses")
      .upsert(
        statuses.map((status) => ({
          ...status,
          workspace: workspaceId,
        })),
        { onConflict: "id" }
      )
      .throwOnError();

    updateTag(`task-statuses:${domain}`);
  });
