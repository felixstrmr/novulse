import { cacheLife, cacheTag } from "next/cache";
import { cache } from "react";
import { supabaseClient } from "@/lib/clients/supabase-client";

export const getClients = cache(async (domain: string) => {
  "use cache: private";
  cacheTag(`clients:${domain}`);
  cacheLife("max");

  const supabase = await supabaseClient();

  const { data } = await supabase
    .from("clients")
    .select(`
      *,
      workspace!inner(domain)
    `)
    .eq("workspace.domain", domain)
    .order("created_at", { ascending: false })
    .throwOnError();

  return data;
});
