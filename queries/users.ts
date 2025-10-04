import { cache } from "react";
import { supabaseClient } from "@/lib/clients/supabase-client";

export const getUser = cache(async () => {
  const supabase = await supabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return null;
  }

  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("id", session.user.id)
    .maybeSingle()
    .throwOnError();

  return data;
});
