import { cacheLife } from "next/cache";
import { supabaseClient } from "@/lib/clients/supabase-client";

export async function getUsers(domain: string) {
  "use cache: private";
  cacheLife("max");

  const supabase = await supabaseClient();

  const { data } = await supabase
    .from("users")
    .select("*, workspace_users!inner(workspace!inner(domain))")
    .eq("workspace_users.workspace.domain", domain)
    .throwOnError();

  return data;
}
