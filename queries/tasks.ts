import { eq } from "drizzle-orm";
import React from "react";
import { db } from "@/db";
import { tasks, workspaces } from "@/db/schema";

export const getTasks = React.cache(async (domain: string) => {
  const data = await db
    .select({
      id: tasks.id,
      name: tasks.name,
      description: tasks.description,
      type: tasks.type,
      workspaceId: tasks.workspaceId,
      createdAt: tasks.createdAt,
      updatedAt: tasks.updatedAt,
    })
    .from(tasks)
    .innerJoin(workspaces, eq(tasks.workspaceId, workspaces.id))
    .where(eq(workspaces.domain, domain));

  return data;
});
