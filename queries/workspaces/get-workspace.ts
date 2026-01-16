import { cacheLife, cacheTag } from "next/cache";
import { supabaseClient } from "@/lib/clients/supabase-client";

export async function getWorkspace(domain: string) {
  "use cache: private";
  cacheLife("max");
  cacheTag(`workspace:${domain}`);

  const supabase = await supabaseClient();

  const { data } = await supabase
    .from("workspaces")
    .select("id, domain, name, settings")
    .eq("domain", domain)
    .maybeSingle()
    .throwOnError();

  return data;
}
