import { and, eq } from "drizzle-orm";
import { cache } from "react";
import { db } from "@/db";
import { clients, organizations, projects } from "@/db/schema";

export const getProjects = cache(async (domain: string) => {
  const data = await db
    .select({
      id: projects.id,
      name: projects.name,
      description: projects.description,
      status: projects.status,
      priority: projects.priority,
      startDate: projects.startDate,
      endDate: projects.endDate,
      clientId: clients.id,
      clientName: clients.name,
    })
    .from(projects)
    .innerJoin(organizations, eq(projects.organizationId, organizations.id))
    .innerJoin(clients, eq(projects.clientId, clients.id))
    .where(eq(organizations.slug, domain));

  return data;
});

export const getProjectById = cache(
  async (domain: string, projectId: string) => {
    const data = await db
      .select({
        id: projects.id,
        name: projects.name,
        description: projects.description,
        status: projects.status,
        priority: projects.priority,
        startDate: projects.startDate,
        endDate: projects.endDate,
        clientId: clients.id,
        clientName: clients.name,
      })
      .from(projects)
      .innerJoin(organizations, eq(projects.organizationId, organizations.id))
      .innerJoin(clients, eq(projects.clientId, clients.id))
      .where(and(eq(organizations.slug, domain), eq(projects.id, projectId)));

    return data[0];
  }
);
