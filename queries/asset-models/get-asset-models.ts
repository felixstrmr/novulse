import { cacheLife, cacheTag } from "next/cache";
import { supabaseClient } from "@/lib/clients/supabase-client";

export async function getAssetModels(domain: string) {
  "use cache: private";
  cacheLife("max");
  cacheTag(`asset-models:${domain}`);

  const supabase = await supabaseClient();

  const { data } = await supabase
    .from("asset_models")
    .select("*, workspace!inner(domain)")
    .eq("workspace.domain", domain)
    .order("name", { ascending: true })
    .throwOnError();

  return data;
}
