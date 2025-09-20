"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { authActionClient } from "@/lib/clients/action-client";
import { updateProjectSchema } from "@/schemas/update-project-schema";
import { updateProjectTask } from "@/tasks/update-project-task";

export const updateProjectAction = authActionClient
  .metadata({
    name: "update-project-action",
  })
  .inputSchema(updateProjectSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { id, oldStatus, newStatus } = parsedInput;
    const { organizationId, session } = ctx;

    await db
      .update(projects)
      .set({ status: newStatus })
      .where(eq(projects.id, id));

    if (oldStatus && newStatus) {
      updateProjectTask.trigger({
        organizationId,
        oldStatus,
        newStatus,
        projectId: id,
        userId: session.user.id,
      });
    }

    revalidatePath("/dashboard/projects");
  });
