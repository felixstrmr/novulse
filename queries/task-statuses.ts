import { cacheLife, cacheTag } from "next/cache";
import { supabaseClient } from "@/lib/clients/supabase-client";

export async function getTaskStatuses(domain: string) {
  "use cache: private";
  cacheLife("max");
  cacheTag(`task-statuses:${domain}`);

  const supabase = await supabaseClient();

  const { data } = await supabase
    .from("task_statuses")
    .select("*, workspace!inner(domain)")
    .eq("workspace.domain", domain)
    .order("order", { ascending: true })
    .throwOnError();

  return data;
}
