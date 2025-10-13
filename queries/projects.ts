import { cache } from "react";
import { supabaseClient } from "@/lib/clients/supabase-client";

export const getProjects = cache(async (domain: string) => {
  const supabase = await supabaseClient();

  const { data } = await supabase
    .from("projects")
    .select("*, workspace(domain), client(id, name, slug)")
    .eq("workspace.domain", domain)
    .throwOnError();

  return data;
});
