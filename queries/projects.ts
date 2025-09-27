import { eq } from "drizzle-orm";
import { db } from "@/db";
import { clients, projectStatuses, projects, workspaces } from "@/db/schema";

export const getProjects = async (domain: string) => {
  const data = await db
    .select({
      id: projects.id,
      name: projects.name,
      description: projects.description,
      startDate: projects.startDate,
      targetDate: projects.targetDate,
      priority: projects.priority,
      statusId: projects.statusId,
      clientId: projects.clientId,
      createdAt: projects.createdAt,
      updatedAt: projects.updatedAt,
      status: {
        id: projectStatuses.id,
        name: projectStatuses.name,
        color: projectStatuses.color,
      },
      client: {
        id: clients.id,
        name: clients.name,
      },
    })
    .from(projects)
    .innerJoin(workspaces, eq(projects.workspaceId, workspaces.id))
    .innerJoin(projectStatuses, eq(projects.statusId, projectStatuses.id))
    .innerJoin(clients, eq(projects.clientId, clients.id))
    .where(eq(workspaces.domain, domain));

  return data;
};
