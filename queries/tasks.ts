import { cache } from "react";
import { supabaseClient } from "@/lib/clients/supabase-client";

export const getTasks = cache(async (domain: string) => {
  const supabase = await supabaseClient();

  const { data } = await supabase
    .from("tasks")
    .select("*, workspace!inner(domain)")
    .eq("workspace.domain", domain)
    .order("created_at", { ascending: false })
    .throwOnError();

  return data;
});
