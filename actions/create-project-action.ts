"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { authActionClient } from "@/lib/clients/action-client";
import { createProjectSchema } from "@/schemas/create-project-schema";

export const createProjectAction = authActionClient
  .metadata({
    name: "create-project-action",
  })
  .inputSchema(createProjectSchema)
  .action(async ({ parsedInput, ctx }) => {
    const {
      name,
      description,
      startDate,
      targetDate,
      priority,
      statusId,
      clientId,
    } = parsedInput;
    const { workspaceId } = ctx;
    const id = randomUUID();

    await db.insert(projects).values({
      id,
      name,
      description,
      startDate,
      targetDate,
      priority,
      clientId,
      statusId,
      workspaceId,
    });

    revalidatePath("/dashboard/projects", "page");

    return { id };
  });
