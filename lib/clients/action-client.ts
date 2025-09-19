import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { createSafeActionClient } from "next-safe-action";
import z from "zod";
import { db } from "@/db";
import { members, organizations } from "@/db/schema";
import { auth } from "@/lib/auth";
import { extractDomain } from "@/lib/utils";

export const actionClient = createSafeActionClient({
  defineMetadataSchema() {
    return z.object({
      name: z.string(),
    });
  },
  handleServerError(error, { metadata }) {
    console.error(metadata.name, error.message);

    return error.message;
  },
});

export const authActionClient = actionClient.use(async ({ next }) => {
  const headersList = await headers();
  const hostname = headersList.get("host");
  const domain = extractDomain(hostname ?? "");

  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const member = await db
    .select({
      organizationId: organizations.id,
      organizationSlug: organizations.slug,
      organizationName: organizations.name,
      memberId: members.id,
      memberRole: members.role,
    })
    .from(members)
    .innerJoin(organizations, eq(members.organizationId, organizations.id))
    .where(
      and(eq(members.userId, session.user.id), eq(organizations.slug, domain))
    );

  if (!member) {
    throw new Error("Unauthorized");
  }

  return next({
    ctx: {
      session,
      organizationId: member[0].organizationId,
      organizationSlug: member[0].organizationSlug,
      organizationName: member[0].organizationName,
      memberId: member[0].memberId,
      memberRole: member[0].memberRole,
    },
  });
});
