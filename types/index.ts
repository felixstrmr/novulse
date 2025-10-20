import type { Tables } from "@/types/supabase";

export type Workspace = Tables<"workspaces">;
export type Client = Tables<"clients">;
export type Project = Tables<"projects">;
export type ProjectStatus = Tables<"project_statuses">;
