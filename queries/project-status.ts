import { cache } from "react";
import { supabaseClient } from "@/lib/clients/supabase-client";

export const getProjectStatuses = cache(async (domain: string) => {
  const supabase = await supabaseClient();

  const { data } = await supabase
    .from("project_statuses")
    .select(`
      *,
      workspace!inner(domain)
    `)
    .eq("workspace.domain", domain)
    .order("position", { ascending: true })
    .throwOnError();

  return data;
});
