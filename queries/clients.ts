import { cache } from "react";
import { supabaseClient } from "@/lib/clients/supabase-client";

export const getClients = cache(async (domain: string) => {
  const supabase = await supabaseClient();

  const { data } = await supabase
    .from("clients")
    .select("id, name, slug, created_at, workspace!inner(domain)")
    .eq("workspace.domain", domain)
    .order("created_at", { ascending: false })
    .throwOnError();

  return data;
});
