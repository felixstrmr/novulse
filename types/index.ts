import type { Tables } from "@/types/supabase";

export type Workspace = Tables<"workspaces">;
export type Client = Tables<"clients">;
export type ProjectStatus = Tables<"project_statuses">;
export type TaskStatus = Tables<"task_statuses">;

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

export type Task = Tables<"tasks"> & {
  workspace: {
    domain: string;
  };
  project: {
    id: string;
    name: string;
    client: string;
  };
  priority: {
    id: string;
    name: string;
    icon: string;
    color: string;
  } | null;
  task_users: {
    user: {
      id: string;
      display_name: string | null;
      avatar: string | null;
    };
  }[];
};
