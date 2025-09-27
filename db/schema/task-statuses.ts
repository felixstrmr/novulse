import { relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { workspaces } from "@/db/schema/workspaces";

export const taskStatuses = pgTable("task_statuses", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  color: text("color").notNull(),
  order: integer("order").notNull(),

  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const taskStatusesRelations = relations(taskStatuses, ({ one }) => ({
  workspace: one(workspaces, {
    fields: [taskStatuses.workspaceId],
    references: [workspaces.id],
  }),
}));
