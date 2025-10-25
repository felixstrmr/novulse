import { cacheLife, cacheTag } from "next/cache";
import { cache } from "react";
import { supabaseClient } from "@/lib/clients/supabase-client";
import type { Tables } from "@/types/supabase";

export const getClients = cache(
  async (
    domain: string,
    orderBy: keyof Tables<"clients"> = "created_at",
    orderDirection: "asc" | "desc" = "asc"
  ) => {
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
      .order(orderBy, { ascending: orderDirection === "asc" })
      .throwOnError();

    return data;
  }
);
