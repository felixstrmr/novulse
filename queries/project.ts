import { cache } from "react";
import { supabaseClient } from "@/lib/clients/supabase-client";

export const getProjects = cache(async (domain: string) => {
  const supabase = await supabaseClient();

  const { data } = await supabase
    .from("projects")
    .select(`
      *,
      workspace!inner(domain),
      client(id, name)
    `)
    .eq("workspace.domain", domain)
    .order("created_at", { ascending: false })
    .throwOnError();

  return data;
});
