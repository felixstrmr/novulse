import { and, eq } from "drizzle-orm";
import { cache } from "react";
import { db } from "@/db";
import { organizations, projectUsers, users } from "@/db/schema";

export const getProjectUsersByProjectId = cache(
  async (domain: string, projectId: string) => {
    const data = await db
      .select({
        userId: projectUsers.userId,
        userName: users.name,
        userImage: users.image,
        role: projectUsers.role,
      })
      .from(projectUsers)
      .innerJoin(
        organizations,
        eq(projectUsers.organizationId, organizations.id)
      )
      .innerJoin(users, eq(projectUsers.userId, users.id))
      .where(
        and(
          eq(organizations.slug, domain),
          eq(projectUsers.projectId, projectId)
        )
      );

    return data;
  }
);
