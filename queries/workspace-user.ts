import { cacheLife, cacheTag } from "next/cache";
import { supabaseClient } from "@/lib/clients/supabase-client";

export async function getWorkspaceUser(domain: string) {
  "use cache: private";
  cacheLife("max");
  cacheTag(`workspace-users:${domain}`);

  const supabase = await supabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data } = await supabase
    .from("workspace_users")
    .select("*, workspace!inner(id, name, domain)")
    .eq("workspace.domain", domain)
    .eq("user", user.id)
    .maybeSingle()
    .throwOnError();

  return data;
}
