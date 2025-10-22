import { cacheLife, cacheTag } from "next/cache";
import { cache } from "react";
import { supabaseClient } from "@/lib/clients/supabase-client";

export const getProjects = cache(async (domain: string) => {
  "use cache: private";
  cacheTag(`projects:${domain}`);
  cacheLife("max");

  const supabase = await supabaseClient();

  const { data } = await supabase
    .from("projects")
    .select(`
      *,
      workspace!inner(domain),
      client(id, name),
      priority(id, name, icon, color)
    `)
    .eq("workspace.domain", domain)
    .order("created_at", { ascending: false })
    .throwOnError();

  return data;
});

export const getProject = cache(async (domain: string, projectId: string) => {
  "use cache: private";
  cacheTag(`projects:${domain}`);
  cacheTag(`project:${projectId}`);
  cacheLife("max");

  const supabase = await supabaseClient();

  const { data } = await supabase
    .from("projects")
    .select(`
      *,  
      workspace!inner(domain),
      client(id, name),
      priority(id, name, icon, color)
    `)
    .eq("workspace.domain", domain)
    .eq("id", projectId)
    .maybeSingle()
    .throwOnError();

  return data;
});
