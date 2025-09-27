import { eq } from "drizzle-orm";
import { db } from "@/db";
import { projectStatuses, workspaces } from "@/db/schema";

export const getProjectStatuses = async (domain: string) => {
  const data = await db
    .select({
      id: projectStatuses.id,
      name: projectStatuses.name,
      description: projectStatuses.description,
      color: projectStatuses.color,
      order: projectStatuses.order,
      workspaceId: projectStatuses.workspaceId,
      createdAt: projectStatuses.createdAt,
      updatedAt: projectStatuses.updatedAt,
    })
    .from(projectStatuses)
    .innerJoin(workspaces, eq(projectStatuses.workspaceId, workspaces.id))
    .where(eq(workspaces.domain, domain));

  return data;
};
