import { eq } from "drizzle-orm";
import { cache } from "react";
import { db } from "@/db";
import { clients, organizations } from "@/db/schema";

export const getClients = cache(async (domain: string) => {
  const data = await db
    .select({
      id: clients.id,
      status: clients.status,
      name: clients.name,
      image: clients.image,
      website: clients.website,
    })
    .from(clients)
    .innerJoin(organizations, eq(clients.organizationId, organizations.id))
    .where(eq(organizations.slug, domain));

  return data;
});
