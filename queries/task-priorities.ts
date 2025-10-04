import { cache } from "react";
import { supabaseClient } from "@/lib/clients/supabase-client";

export const getTaskPriorities = cache(async (domain: string) => {
  const supabase = await supabaseClient();

  const { data } = await supabase
    .from("task_priorities")
    .select("*, workspace!inner(domain)")
    .eq("workspace.domain", domain)
    .order("order", { ascending: true })
    .throwOnError();

  return data;
});
