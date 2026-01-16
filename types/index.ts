import type { Json } from "@/types/supabase";

export interface Workspace {
  id: string;
  domain: string;
  name: string;
  settings: Json;
}
