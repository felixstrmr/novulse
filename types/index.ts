import type { Tables } from "@/types/supabase";

export type Workspace = Tables<"workspaces"> & {
  workspace_users: {
    id: string;
    user: string;
    role: "owner" | "manager" | "designer" | "client";
  }[];
};

export type Client = Tables<"clients"> & {
  workspace: {
    domain: string;
  };
};

export type ProjectStatus = Tables<"project_statuses"> & {
  workspace: {
    domain: string;
  };
};

export type Project = Tables<"projects"> & {
  workspace: {
    domain: string;
  };
};
