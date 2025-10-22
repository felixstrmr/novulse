import type { Tables } from "@/types/supabase";

export type Workspace = Tables<"workspaces">;
export type Client = Tables<"clients">;
export type ProjectStatus = Tables<"project_statuses">;

export type Project = Tables<"projects"> & {
  workspace: {
    domain: string;
  };
  client: {
    id: string;
    name: string;
  };
  priority: {
    id: string;
    name: string;
    icon: string;
    color: string;
  } | null;
};
