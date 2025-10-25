"use server";

import { updateTag } from "next/cache";
import z from "zod";
import { authActionClient } from "@/lib/clients/action-client";
import { supabaseClient } from "@/lib/clients/supabase-client";

export const updateTaskAction = authActionClient
  .metadata({
    name: "update-task-action",
  })
  .inputSchema(
    z.object({
      id: z.uuid().min(1),
      statusId: z.uuid().optional(),
    })
  )
  .action(async ({ parsedInput, ctx }) => {
    const { id, statusId } = parsedInput;
    const { workspaceUser } = ctx;
    const domain = workspaceUser.workspace.domain;

    const supabase = await supabaseClient();

    await supabase
      .from("tasks")
      .update({
        status: statusId,
      })
      .eq("id", id)
      .throwOnError();

    updateTag(`tasks:${domain}`);
    updateTag(`task:${id}`);
  });
