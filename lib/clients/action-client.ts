import { headers } from "next/headers";
import { createSafeActionClient } from "next-safe-action";
import z from "zod";
import { getWorkspaceUser } from "@/queries/workspace-user";
import { getSubdomain } from "@/utils/domain";

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
  const subdomain = getSubdomain(hostname ?? "");

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
