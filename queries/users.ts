import { cache } from "react";
import { supabaseClient } from "@/lib/clients/supabase-client";

export const getUser = cache(async () => {
  const supabase = await supabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .maybeSingle()
    .throwOnError();

  return data;
});
