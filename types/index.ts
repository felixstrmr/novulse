import type {
  clients,
  projectStatuses,
  projectUsers,
  tasks,
  workspaces,
} from "@/db/schema";
import type { auth } from "@/lib/auth";

export type Session = typeof auth.$Infer.Session;

export type Workspace = typeof workspaces.$inferSelect;
export type Client = typeof clients.$inferSelect;
export type Task = typeof tasks.$inferSelect;
export type ProjectStatus = typeof projectStatuses.$inferSelect;
export type ProjectUser = typeof projectUsers.$inferSelect;

export type Project = {
  id: string;
  name: string;
  description: string | null;
  startDate: Date | null;
  targetDate: Date | null;
  priority: string | null;

  status: {
    id: string;
    name: string;
    color: string;
  };
  client: {
    id: string;
    name: string;
  } | null;

  updatedAt: Date;
  createdAt: Date;
};
