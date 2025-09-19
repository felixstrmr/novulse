import { relations } from "drizzle-orm";
import { pgEnum, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { organizations, projects, users } from "@/db/schema";

export const projectUserRole = pgEnum("project_user_role", [
  "Member",
  "Leader",
]);

export const projectUsers = pgTable("project_users", {
  id: uuid("id").primaryKey().defaultRandom(),
  role: projectUserRole("role").notNull().default("Member"),

  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
  projectId: uuid("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const projectUsersRelations = relations(projectUsers, ({ one }) => ({
  organization: one(organizations, {
    fields: [projectUsers.organizationId],
    references: [organizations.id],
  }),
  project: one(projects, {
    fields: [projectUsers.projectId],
    references: [projects.id],
  }),
  user: one(users, {
    fields: [projectUsers.userId],
    references: [users.id],
  }),
}));
