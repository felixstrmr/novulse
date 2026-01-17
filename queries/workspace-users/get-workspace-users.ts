import { cacheLife, cacheTag } from "next/cache";
import { supabaseClient } from "@/lib/clients/supabase-client";

export async function getWorkspaceUsers(domain: string) {
  "use cache: private";
  cacheLife("max");
  cacheTag(`workspace-users:${domain}`);

  const supabase = await supabaseClient();

  const { data } = await supabase
    .from("workspace_users")
    .select("*, workspace!inner(domain), user(*)")
    .eq("workspace.domain", domain)
    .order("created_at", { ascending: true })
    .throwOnError();

  return data;
}
