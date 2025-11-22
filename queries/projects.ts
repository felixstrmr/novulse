import { cacheLife, cacheTag } from "next/cache";
import { supabaseClient } from "@/lib/clients/supabase-client";

export async function getProjects(domain: string) {
  "use cache: private";
  cacheLife("max");
  cacheTag(`projects:${domain}`);

  const supabase = await supabaseClient();

  const { data } = await supabase
    .from("projects")
    .select("*, workspace!inner(domain)")
    .eq("workspace.domain", domain)
    .order("created_at", { ascending: false })
    .throwOnError();

  return data;
}
