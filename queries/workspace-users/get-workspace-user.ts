import { cacheLife, cacheTag } from "next/cache";
import { supabaseClient } from "@/lib/clients/supabase-client";

export async function getWorkspaceUser(domain: string) {
  "use cache: private";
  cacheLife("max");

  const supabase = await supabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  cacheTag(`workspace-user:${domain}:${user.id}`);

  const { data } = await supabase
    .from("workspace_users")
    .select("*, workspace!inner(domain)")
    .eq("user", user.id)
    .eq("workspace.domain", domain)
    .maybeSingle()
    .throwOnError();

  return data;
}
