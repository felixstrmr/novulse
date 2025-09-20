import { and, desc, eq } from "drizzle-orm";
import { cache } from "react";
import { db } from "@/db";
import { activities, organizations, users } from "@/db/schema";

export const getActivitiesByProjectId = cache(
  async (domain: string, projectId: string) => {
    const data = await db
      .select({
        id: activities.id,
        type: activities.type,
        description: activities.description,
        createdAt: activities.createdAt,
        userName: users.name,
      })
      .from(activities)
      .innerJoin(organizations, eq(activities.organizationId, organizations.id))
      .innerJoin(users, eq(activities.userId, users.id))
      .where(
        and(eq(organizations.slug, domain), eq(activities.projectId, projectId))
      )
      .orderBy(desc(activities.createdAt));

    return data;
  }
);
