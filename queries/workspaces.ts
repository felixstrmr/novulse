import { cache } from "react";
import { supabaseClient } from "@/lib/clients/supabase-client";

export const getWorkspaces = cache(async () => {
  const supabase = await supabaseClient();

  const { data } = await supabase
    .from("workspaces")
    .select("*")
    .order("created_at", { ascending: true })
    .throwOnError();

  return data;
});
