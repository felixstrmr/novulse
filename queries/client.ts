import { cacheLife, cacheTag } from "next/cache";
import { supabaseClient } from "@/lib/clients/supabase-client";

export async function getClients(domain: string) {
  "use cache: private";
  cacheLife("max");
  cacheTag(`clients:${domain}`);

  const supabase = await supabaseClient();

  const { data } = await supabase
    .from("clients")
    .select("*, workspace!inner(domain)")
    .eq("workspace.domain", domain)
    .order("created_at", { ascending: false })
    .throwOnError();

  return data;
}

export async function getClient(domain: string, clientId: string) {
  "use cache: private";
  cacheLife("max");
  cacheTag(`client:${domain}:${clientId}`);

  const supabase = await supabaseClient();

  const { data } = await supabase
    .from("clients")
    .select("*, workspace!inner(domain)")
    .eq("workspace.domain", domain)
    .eq("id", clientId)
    .maybeSingle()
    .throwOnError();

  return data;
}
