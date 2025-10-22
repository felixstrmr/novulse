import { cacheLife, cacheTag } from "next/cache";
import { cache } from "react";
import { supabaseClient } from "@/lib/clients/supabase-client";

export const getTaskStatuses = cache(async (domain: string) => {
  "use cache: private";
  cacheTag(`task-statuses:${domain}`);
  cacheLife("max");

  const supabase = await supabaseClient();

  const { data } = await supabase
    .from("task_statuses")
    .select(`
      *,
      workspace!inner(domain)
    `)
    .eq("workspace.domain", domain)
    .order("position", { ascending: true })
    .throwOnError();

  return data;
});
