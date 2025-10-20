"use server";

import { revalidatePath } from "next/cache";
import z from "zod";
import { authActionClient } from "@/lib/clients/action-client";
import { supabaseClient } from "@/lib/clients/supabase-client";

export const updateProjectAction = authActionClient
  .metadata({
    name: "update-project-action",
  })
  .inputSchema(
    z.object({
      id: z.uuid().min(1),
      statusId: z.uuid().optional(),
    })
  )
  .action(async ({ parsedInput }) => {
    const { id, statusId } = parsedInput;

    const supabase = await supabaseClient();

    await supabase
      .from("projects")
      .update({
        status: statusId,
      })
      .eq("id", id)
      .throwOnError();

    revalidatePath("/dashboard/projects");
  });
