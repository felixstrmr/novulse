import type { Database, Json } from "@/types/supabase";

export interface Workspace {
  id: string;
  domain: string;
  name: string;
  settings: Json;
}

export interface Asset {
  assigned_to: string | null;
  category: string & {
    id: string;
    name: string;
  };
  created_at: string;
  description: string | null;
  id: string;
  manufacturer:
    | (string & {
        id: string;
        name: string;
      })
    | null;
  model:
    | (string & {
        id: string;
        name: string;
      })
    | null;
  name: string;
  status: string & {
    id: string;
    color: string;
    name: string;
  };
  type: Database["public"]["Enums"]["asset_types"];
  workspace: string & {
    domain: string;
  };
}
