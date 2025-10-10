import { cache } from "react";
import type { Supabase } from "@/types";

export const getWorkspaces = cache(
  async (supabase: Supabase, userId: string) => {
    const { data } = await supabase
      .from("workspaces")
      .select("id, name, domain, workspace_users!inner(user)")
      .eq("workspace_users.user", userId)
      .throwOnError();

    return data;
  }
);
