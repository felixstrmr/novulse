import { cache } from "react";
import type { Supabase } from "@/types";

export const getUser = cache(async (supabase: Supabase) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
});
