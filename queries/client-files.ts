import { cacheLife, cacheTag } from "next/cache";
import { supabaseClient } from "@/lib/clients/supabase-client";

export async function getClientFiles(domain: string, clientId: string) {
  "use cache: private";
  cacheLife("max");
  cacheTag(`client-files:${domain}:${clientId}`);

  const supabase = await supabaseClient();

  const { data } = await supabase
    .from("client_files")
    .select(
      "*, workspace!inner(domain), file:files!inner(id, name, path, size, type)"
    )
    .eq("workspace.domain", domain)
    .eq("client", clientId)
    .throwOnError();

  return data;
}
