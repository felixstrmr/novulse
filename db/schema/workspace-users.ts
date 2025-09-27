import { relations } from "drizzle-orm";
import { pgEnum, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "@/db/schema/users";
import { workspaces } from "@/db/schema/workspaces";

export const workspaceUserRoles = pgEnum("workspace_user_roles", [
  "owner",
  "admin",
  "user",
]);

export const workspaceUsers = pgTable("workspace_users", {
  id: uuid("id").primaryKey().defaultRandom(),
  role: workspaceUserRoles("role").notNull().default("user"),

  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const workspaceUserRelations = relations(workspaceUsers, ({ one }) => ({
  workspace: one(workspaces, {
    fields: [workspaceUsers.workspaceId],
    references: [workspaces.id],
  }),
  user: one(users, {
    fields: [workspaceUsers.userId],
    references: [users.id],
  }),
}));
