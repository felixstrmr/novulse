import { headers } from "next/headers";
import { createSafeActionClient } from "next-safe-action";
import z from "zod";
import { getWorkspaceUser } from "@/queries/workspace-user";
import { getUniqueDomain } from "@/utils/domain";

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
  const host = headersList.get("host");
  const domain = getUniqueDomain(host ?? "");

  const workspaceUser = await getWorkspaceUser(domain);

  if (!workspaceUser) {
    throw new Error("Unauthorized");
  }

  return next({
    ctx: {
      domain: workspaceUser.workspace.domain,
      workspaceId: workspaceUser.workspace.id,
      userId: workspaceUser.user,
    },
  });
});
