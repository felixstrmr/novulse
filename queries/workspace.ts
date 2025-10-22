import { cacheLife, cacheTag } from "next/cache";
import { cache } from "react";
import { supabaseClient } from "@/lib/clients/supabase-client";

export const getWorkspaces = cache(async () => {
  "use cache: private";
  cacheTag("workspaces");
  cacheLife("max");

  const supabase = await supabaseClient();

  const { data } = await supabase
    .from("workspaces")
    .select(`
      *
    `)
    .throwOnError();

  return data;
});

export const getWorkspace = cache(async (domain: string) => {
  "use cache: private";
  cacheTag(`workspace:${domain}`);
  cacheLife("max");

  const supabase = await supabaseClient();

  const { data } = await supabase
    .from("workspaces")
    .select(`
      *,  
    `)
    .eq("domain", domain)
    .maybeSingle()
    .throwOnError();

  return data;
});
