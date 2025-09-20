"use server";

import { db } from "@/db";
import { activities, projects, projectUsers } from "@/db/schema";
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

    await Promise.all([
      db.insert(projectUsers).values({
        organizationId,
        projectId: project.id,
        userId: session.user.id,
        role: "Lead",
      }),
      db.insert(activities).values({
        organizationId,
        projectId: project.id,
        userId: session.user.id,
        type: "project_created",
        description: "created the project",
      }),
    ]);

    return project;
  });
