import { eq } from "drizzle-orm";
import { cache } from "react";
import { db } from "@/db";
import { clients, workspaces } from "@/db/schema";

export const getClients = cache(async (domain: string) => {
  const data = await db
    .select({
      id: clients.id,
      name: clients.name,
      slug: clients.slug,
      workspaceId: clients.workspaceId,
      createdAt: clients.createdAt,
      updatedAt: clients.updatedAt,
    })
    .from(clients)
    .innerJoin(workspaces, eq(clients.workspaceId, workspaces.id))
    .where(eq(workspaces.domain, domain));

  return data;
});
