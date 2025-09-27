import { eq } from "drizzle-orm";
import { db } from "@/db";
import { projects, workspaces } from "@/db/schema";

export const getProjects = async (domain: string) => {
  const data = await db
    .select({
      id: projects.id,
      name: projects.name,
      description: projects.description,
      startDate: projects.startDate,
      targetDate: projects.targetDate,
      priority: projects.priority,
      workspaceId: projects.workspaceId,
      statusId: projects.statusId,
      createdAt: projects.createdAt,
      updatedAt: projects.updatedAt,
    })
    .from(projects)
    .innerJoin(workspaces, eq(projects.workspaceId, workspaces.id))
    .where(eq(workspaces.domain, domain));

  return data;
};
