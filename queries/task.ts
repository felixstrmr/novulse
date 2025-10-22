import { cacheLife, cacheTag } from "next/cache";
import { cache } from "react";
import { supabaseClient } from "@/lib/clients/supabase-client";

export const getTasks = cache(async (domain: string) => {
  "use cache: private";
  cacheTag(`tasks:${domain}`);
  cacheLife("max");

  const supabase = await supabaseClient();

  const { data } = await supabase
    .from("tasks")
    .select(`
      *,
      workspace!inner(domain),
      project(id, name),
      priority(id, name, icon, color)
    `)
    .eq("workspace.domain", domain)
    .order("created_at", { ascending: false })
    .throwOnError();

  return data;
});
