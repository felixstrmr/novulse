import type {
  clients,
  projectStatuses,
  projects,
  projectUsers,
  tasks,
  workspaces,
} from "@/db/schema";
import type { auth } from "@/lib/auth";

export type Session = typeof auth.$Infer.Session;

export type Workspace = typeof workspaces.$inferSelect;
export type Client = typeof clients.$inferSelect;
export type Task = typeof tasks.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type ProjectStatus = typeof projectStatuses.$inferSelect;
export type ProjectUser = typeof projectUsers.$inferSelect;
