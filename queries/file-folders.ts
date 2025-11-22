import { cacheLife, cacheTag } from "next/cache";
import { supabaseClient } from "@/lib/clients/supabase-client";

export async function getFileFolders(domain: string) {
  "use cache: private";
  cacheLife("max");
  cacheTag(`file-folders:${domain}`);

  const supabase = await supabaseClient();

  const { data } = await supabase
    .from("file_folders")
    .select("*, workspace!inner(domain)")
    .eq("workspace.domain", domain)
    .throwOnError();

  return data;
}
