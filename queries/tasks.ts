import { and, eq } from "drizzle-orm";
import React from "react";
import { db } from "@/db";
import {
  clients,
  projects,
  taskStatuses,
  tasks,
  workspaces,
} from "@/db/schema";

export const getTasks = React.cache(async (domain: string) => {
  const data = await db
    .select({
      id: tasks.id,
      name: tasks.name,
      description: tasks.description,
      type: tasks.type,

      client: {
        id: clients.id,
        name: clients.name,
      },

      project: {
        id: projects.id,
        name: projects.name,
      },

      status: {
        id: taskStatuses.id,
        name: taskStatuses.name,
        color: taskStatuses.color,
      },

      createdAt: tasks.createdAt,
      updatedAt: tasks.updatedAt,
    })
    .from(tasks)
    .innerJoin(workspaces, eq(tasks.workspaceId, workspaces.id))
    .innerJoin(taskStatuses, eq(tasks.statusId, taskStatuses.id))
    .leftJoin(clients, eq(tasks.clientId, clients.id))
    .leftJoin(projects, eq(tasks.projectId, projects.id))
    .where(eq(workspaces.domain, domain));

  return data;
});

export const getTaskById = React.cache(
  async (domain: string, taskId: string) => {
    const [data] = await db
      .select({
        id: tasks.id,
        name: tasks.name,
        description: tasks.description,
        type: tasks.type,

        client: {
          id: clients.id,
          name: clients.name,
        },

        project: {
          id: projects.id,
          name: projects.name,
        },

        status: {
          id: taskStatuses.id,
          name: taskStatuses.name,
          color: taskStatuses.color,
        },

        createdAt: tasks.createdAt,
        updatedAt: tasks.updatedAt,
      })
      .from(tasks)
      .innerJoin(workspaces, eq(tasks.workspaceId, workspaces.id))
      .innerJoin(taskStatuses, eq(tasks.statusId, taskStatuses.id))
      .leftJoin(clients, eq(tasks.clientId, clients.id))
      .leftJoin(projects, eq(tasks.projectId, projects.id))
      .where(and(eq(workspaces.domain, domain), eq(tasks.id, taskId)));

    return data;
  }
);
