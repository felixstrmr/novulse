import type { Tables } from "@/types/supabase";

export type Workspace = Tables<"workspaces">;
export type WorkspaceUser = Tables<"workspace_users">;
export type Client = Tables<"clients">;
export type ProjectStatus = Tables<"project_statuses">;

export type Project = Tables<"projects"> & {
  client: {
    name: string;
    slug: string;
  };
  priority: {
    name: string;
    icon: string;
    color: string;
  } | null;
};
