import { cache } from "react";
import { supabaseClient } from "@/lib/clients/supabase-client";

export const getWorkspaceUser = cache(async (domain: string) => {
  const supabase = await supabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data } = await supabase
    .from("workspace_users")
    .select("*, workspace!inner(id, domain)")
    .eq("workspace.domain", domain)
    .eq("user", user.id)
    .maybeSingle()
    .throwOnError();

  return data;
});
