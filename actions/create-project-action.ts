"use server";

import { revalidateTag } from "next/cache";
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
      clientId,
      name,
      description,
      status,
      priority,
      startDate,
      endDate,
    } = parsedInput;
    const { organizationId, organizationSlug } = ctx;

    await db.insert(projects).values({
      organizationId,
      clientId,
      name,
      description,
      status,
      priority,
      startDate,
      endDate,
    });

    revalidateTag(`projects-${organizationSlug}`);
  });
