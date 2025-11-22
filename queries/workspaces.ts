import { cacheLife, cacheTag } from "next/cache";
import { supabaseClient } from "@/lib/clients/supabase-client";

export async function getWorkspaces() {
  "use cache: private";
  cacheLife("max");
  cacheTag("workspaces");

  const supabase = await supabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data } = await supabase
    .from("workspaces")
    .select("*, workspace_users!inner(id, user, role)")
    .eq("workspace_users.user", user.id)
    .order("created_at", { ascending: false })
    .throwOnError();

  return data;
}
