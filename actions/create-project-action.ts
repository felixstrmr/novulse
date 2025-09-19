"use server";

import { revalidateTag } from "next/cache";
import { db } from "@/db";
import { projects, projectUsers } from "@/db/schema";
import { authActionClient } from "@/lib/clients/action-client";
import { createProjectSchema } from "@/schemas/create-project-schema";

export const createProjectAction = authActionClient
  .metadata({
    name: "create-project-action",
  })
  .inputSchema(createProjectSchema)
  .action(async ({ parsedInput, ctx }) => {
    const {
      clientId,
      name,
      description,
      status,
      priority,
      startDate,
      endDate,
    } = parsedInput;
    const { organizationId, organizationSlug, session } = ctx;

    const [project] = await db
      .insert(projects)
      .values({
        organizationId,
        clientId,
        name,
        description,
        status,
        priority,
        startDate,
        endDate,
      })
      .returning();

    await db.insert(projectUsers).values({
      organizationId,
      projectId: project.id,
      userId: session.user.id,
      role: "Leader",
    });

    revalidateTag(`projects-${organizationSlug}`);
  });
