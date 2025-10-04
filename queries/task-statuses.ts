import { cache } from "react";
import { supabaseClient } from "@/lib/clients/supabase-client";

export const getTaskStatuses = cache(async (domain: string) => {
  const supabase = await supabaseClient();

  const { data } = await supabase
    .from("task_statuses")
    .select("*, workspace!inner(domain)")
    .eq("workspace.domain", domain)
    .order("order", { ascending: true })
    .throwOnError();

  return data;
});
