"use server";

import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { authActionClient } from "@/lib/clients/action-client";
import { updateProjectSchema } from "@/schemas/update-project-schema";

export const updateProjectAction = authActionClient
  .metadata({
    name: "update-project-action",
  })
  .inputSchema(updateProjectSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { id, status } = parsedInput;
    const { organizationSlug } = ctx;

    await db.update(projects).set({ status }).where(eq(projects.id, id));

    revalidateTag(`projects-${organizationSlug}`);
    revalidateTag(`project-${id}`);
  });
