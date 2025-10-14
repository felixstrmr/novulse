"use server";

import { revalidatePath } from "next/cache";
import { authActionClient } from "@/lib/clients/action-client";
import { supabaseClient } from "@/lib/clients/supabase-client";
import { updateProjectSchema } from "@/schemas/update-project-schema";

export const updateProjectAction = authActionClient
  .metadata({
    name: "update-project-action",
  })
  .inputSchema(updateProjectSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { id, statusId } = parsedInput;
    const { workspaceUser } = ctx;

    if (!workspaceUser) {
      throw new Error("Unauthorized");
    }

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
