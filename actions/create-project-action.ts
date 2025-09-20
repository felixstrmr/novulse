"use server";

import { db } from "@/db";
import { projects } from "@/db/schema";
import { authActionClient } from "@/lib/clients/action-client";
import { createProjectSchema } from "@/schemas/create-project-schema";
import { createProjectTask } from "@/tasks/create-project-task";

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
    const { organizationId, session } = ctx;

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

    createProjectTask.trigger({
      organizationId,
      projectId: project.id,
      userId: session.user.id,
    });

    return project;
  });
