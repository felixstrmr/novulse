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
    .select(`
      *,
      workspace!inner(domain),
      user!inner(id)
    `)
    .eq("workspace.domain", domain)
    .eq("user.id", user.id)
    .maybeSingle()
    .throwOnError();

  return data;
});

export const getWorkspaceUsers = cache(async (domain: string) => {
  const supabase = await supabaseClient();

  const { data } = await supabase
    .from("workspace_users")
    .select(`
      *,
      workspace!inner(domain),
      user!inner(id)
    `)
    .eq("workspace.domain", domain)
    .throwOnError();

  return data;
});
