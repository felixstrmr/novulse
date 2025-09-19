import { and, eq } from "drizzle-orm";
import { cache } from "react";
import { db } from "@/db";
import { organizations, tasks } from "@/db/schema";

export const getTasksByProjectId = cache(
  async (domain: string, projectId: string) => {
    const data = await db
      .select({
        id: tasks.id,
        name: tasks.name,
        description: tasks.description,
      })
      .from(tasks)
      .innerJoin(organizations, eq(tasks.organizationId, organizations.id))
      .where(
        and(eq(organizations.slug, domain), eq(tasks.projectId, projectId))
      );

    return data;
  }
);
