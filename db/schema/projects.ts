import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { clients } from "@/db/schema/clients";
import { projectStatuses } from "@/db/schema/project-statuses";
import { projectUsers } from "@/db/schema/project-users";
import { workspaces } from "@/db/schema/workspaces";

export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  startDate: timestamp("start_date"),
  targetDate: timestamp("target_date"),
  priority: text("priority"),

  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  statusId: uuid("status_id")
    .notNull()
    .references(() => projectStatuses.id, { onDelete: "restrict" }),
  clientId: uuid("client_id")
    .notNull()
    .references(() => clients.id, { onDelete: "cascade" }),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const projectsRelations = relations(projects, ({ one, many }) => ({
  workspace: one(workspaces, {
    fields: [projects.workspaceId],
    references: [workspaces.id],
  }),
  status: one(projectStatuses, {
    fields: [projects.statusId],
    references: [projectStatuses.id],
  }),
  client: one(clients, {
    fields: [projects.clientId],
    references: [clients.id],
  }),

  users: many(projectUsers),
}));
