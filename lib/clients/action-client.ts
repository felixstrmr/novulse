import { headers } from "next/headers";
import { createSafeActionClient } from "next-safe-action";
import z from "zod";
import { getWorkspaceUser } from "@/queries/workspace-users";
import { getWorkspaceSubdomain } from "@/utils/workspace";

export const actionClient = createSafeActionClient({
  defineMetadataSchema() {
    return z.object({
      name: z.string(),
    });
  },
  handleServerError(error, { metadata }) {
    console.error(metadata.name, error);

    return error.message;
  },
});

export const authActionClient = actionClient.use(async ({ next }) => {
  const headersList = await headers();
  const hostname = headersList.get("host");
  const subdomain = getWorkspaceSubdomain(hostname ?? "");

  if (!hostname) {
    throw new Error("Hostname is required");
  }

  const workspaceUser = await getWorkspaceUser(subdomain);

  if (!workspaceUser) {
    throw new Error("Unauthorized");
  }

  return next({
    ctx: {
      workspaceUser,
    },
  });
});
