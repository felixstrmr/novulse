import { cache } from "react";
import type { Supabase } from "@/types";

export const getWorkspaceUser = cache(
  async (supabase: Supabase, domain: string, userId: string) => {
    const { data } = await supabase
      .from("workspace_users")
      .select(
        "id, role, workspace!inner(domain), user!inner(id, name, email, avatar)"
      )
      .eq("workspace.domain", domain)
      .eq("user.id", userId)
      .maybeSingle()
      .throwOnError();

    return data;
  }
);
