import { cache } from "react";
import { supabaseClient } from "@/lib/clients/supabase-client";

export const getProjects = cache(async (domain: string) => {
  const supabase = await supabaseClient();

  const { data } = await supabase
    .from("projects")
    .select(
      "*, workspace(domain), client(id, name, slug), priority(name, icon, color)"
    )
    .eq("workspace.domain", domain)
    .order("created_at", { ascending: true })
    .throwOnError();

  return data;
});

export const getProject = cache(async (domain: string, projectId: string) => {
  const supabase = await supabaseClient();

  const { data } = await supabase
    .from("projects")
    .select(
      "*, workspace(domain), client(id, name, slug), priority(name, icon, color)"
    )
    .eq("workspace.domain", domain)
    .eq("id", projectId)
    .maybeSingle()
    .throwOnError();

  return data;
});
