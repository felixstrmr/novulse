import type { Tables } from "@/types/supabase";

export type Workspace = Tables<"workspaces">;
export type Task = Tables<"tasks">;
export type TaskStatus = Tables<"task_statuses">;
export type TaskPriority = Tables<"task_priorities">;

export type Client = {
  id: string;
  name: string;
  slug: string;
  created_at: string;
  workspace: {
    domain: string;
  };
};
