import { and, eq } from "drizzle-orm";
import { cache } from "react";
import { db } from "@/db";
import { workspaces, workspaceUsers } from "@/db/schema";
import { getSession } from "@/queries/sessions";

export const getWorkspaces = cache(async () => {
  const session = await getSession();

  if (!session) {
    return [];
  }

  const data = await db
    .select({
      id: workspaces.id,
      name: workspaces.name,
      domain: workspaces.domain,
      createdAt: workspaces.createdAt,
      updatedAt: workspaces.updatedAt,
    })
    .from(workspaces)
    .innerJoin(workspaceUsers, eq(workspaces.id, workspaceUsers.workspaceId))
    .where(eq(workspaceUsers.userId, session.user.id));

  return data;
});

export const getWorkspaceByDomain = cache(async (domain: string) => {
  const session = await getSession();

  if (!session) {
    return null;
  }

  const [data] = await db
    .select({
      id: workspaces.id,
      name: workspaces.name,
      domain: workspaces.domain,
      createdAt: workspaces.createdAt,
      updatedAt: workspaces.updatedAt,
    })
    .from(workspaces)
    .innerJoin(workspaceUsers, eq(workspaces.id, workspaceUsers.workspaceId))
    .where(
      and(
        eq(workspaces.domain, domain),
        eq(workspaceUsers.userId, session.user.id)
      )
    );

  return data;
});
