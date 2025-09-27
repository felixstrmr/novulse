import { headers } from "next/headers";
import { createSafeActionClient } from "next-safe-action";
import z from "zod";
import { getSession } from "@/queries/sessions";
import { getWorkspaceByDomain } from "@/queries/workspaces";
import { extractDomain } from "@/utils";

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

  const [session, workspace] = await Promise.all([
    getSession(headersList),
    getWorkspaceByDomain(domain),
  ]);

  if (!(session && workspace)) {
    throw new Error("Unauthorized");
  }

  return next({
    ctx: {
      session,
      workspaceId: workspace.id,
    },
  });
});
