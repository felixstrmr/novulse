import { cacheLife, cacheTag } from "next/cache";
import { supabaseClient } from "@/lib/clients/supabase-client";

export async function getAssetRelations(domain: string, assetId: string) {
  "use cache: private";
  cacheLife("max");
  cacheTag(`asset-relations:${domain}:${assetId}`);

  const supabase = await supabaseClient();

  const { data } = await supabase
    .from("asset_relations")
    .select(
      `*,
        workspace!inner(domain),
        parent_asset(id, name),
        child_asset(id, name),
        type(id, name)
      `
    )
    .eq("workspace.domain", domain)
    .or(`parent_asset.eq.${assetId},child_asset.eq.${assetId}`)
    .throwOnError();

  return data;
}
