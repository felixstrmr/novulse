import { eq } from "drizzle-orm";
import { db } from "@/db";
import { taskStatuses, workspaces } from "@/db/schema";

export const getTaskStatuses = async (domain: string) => {
  const data = await db
    .select({
      id: taskStatuses.id,
      name: taskStatuses.name,
      description: taskStatuses.description,
      color: taskStatuses.color,
      order: taskStatuses.order,
      workspaceId: taskStatuses.workspaceId,
      createdAt: taskStatuses.createdAt,
      updatedAt: taskStatuses.updatedAt,
    })
    .from(taskStatuses)
    .innerJoin(workspaces, eq(taskStatuses.workspaceId, workspaces.id))
    .where(eq(workspaces.domain, domain));

  return data;
};
