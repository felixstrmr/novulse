import { cache } from "react";
import { supabaseClient } from "@/lib/clients/supabase-client";

export const getClients = cache(async (domain: string) => {
  const supabase = await supabaseClient();

  const { data } = await supabase
    .from("clients")
    .select("*, workspace!inner(domain)")
    .eq("workspace.domain", domain)
    .order("created_at", { ascending: true })
    .throwOnError();

  return data;
});
