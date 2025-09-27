import { relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { fileFolders } from "@/db/schema/file-folders";
import { workspaces } from "@/db/schema/workspaces";

export const files = pgTable("files", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  path: text("path").notNull(),
  type: text("type").notNull(),
  size: integer("size").notNull(),

  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  folderId: uuid("folder_id").references(() => fileFolders.id, {
    onDelete: "cascade",
  }),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const filesRelations = relations(files, ({ one }) => ({
  workspace: one(workspaces, {
    fields: [files.workspaceId],
    references: [workspaces.id],
  }),
}));
