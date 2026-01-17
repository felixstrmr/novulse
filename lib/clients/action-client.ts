import { headers } from "next/headers";
import { createSafeActionClient } from "next-safe-action";
import z from "zod";
import { supabaseClient } from "@/lib/clients/supabase-client";
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
}).use(async ({ next }) => {
  const supabase = await supabaseClient();

  return next({
    ctx: {
      supabase,
    },
  });
});

export const authActionClient = actionClient.use(async ({ next, ctx }) => {
  const { supabase } = ctx;

  const headersList = await headers();
  const hostname = headersList.get("host");

  if (!hostname) {
    throw new Error("Hostname is required");
  }

  const domain = getSubdomain(hostname);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { data: workspace } = await supabase
    .from("workspaces")
    .select("*")
    .eq("domain", domain)
    .maybeSingle()
    .throwOnError();

  if (!workspace) {
    throw new Error("Workspace not found");
  }

  return next({
    ctx: {
      user,
      domain,
      workspace: workspace.id,
    },
  });
});
