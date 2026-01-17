import { cacheLife, cacheTag } from "next/cache";
import { supabaseClient } from "@/lib/clients/supabase-client";

export async function getAssets(domain: string) {
  "use cache: private";
  cacheLife("max");
  cacheTag(`assets:${domain}`);

  const supabase = await supabaseClient();

  const { data } = await supabase
    .from("assets")
    .select(
      `*,
        workspace!inner(domain),
        status(id, color, name),
        category(id, name),
        manufacturer(id, name),
        model(id, name),
        location(id, name)
      `
    )
    .eq("workspace.domain", domain)
    .throwOnError();

  return data;
}
