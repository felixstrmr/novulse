import { cacheLife, cacheTag } from "next/cache";
import { supabaseClient } from "@/lib/clients/supabase-client";

export async function getAssetLocations(domain: string) {
  "use cache: private";
  cacheLife("max");
  cacheTag(`asset-locations:${domain}`);

  const supabase = await supabaseClient();

  const { data } = await supabase
    .from("asset_locations")
    .select("*, workspace!inner(domain)")
    .eq("workspace.domain", domain)
    .order("name", { ascending: true })
    .throwOnError();

  return data;
}
