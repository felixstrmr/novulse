import { cache } from "react";
import { supabaseClient } from "@/lib/clients/supabase-client";

export const getWorkspace = cache(async (domain: string) => {
  const supabase = await supabaseClient();

  const { data } = await supabase
    .from("workspaces")
    .select("*")
    .eq("domain", domain)
    .maybeSingle()
    .throwOnError();

  return data;
});

export const getWorkspaces = cache(async () => {
  const supabase = await supabaseClient();

  const { data } = await supabase
    .from("workspaces")
    .select("*")
    .order("created_at", { ascending: false })
    .throwOnError();

  return data;
});
