import { relations } from "drizzle-orm";
import {
  type AnyPgColumn,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { workspaces } from "@/db/schema/workspaces";

export const fileFolders = pgTable("file_folders", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  path: text("path").notNull(),

  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  parentFolderId: uuid("parent_folder_id").references(
    (): AnyPgColumn => fileFolders.id,
    {
      onDelete: "cascade",
    }
  ),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const fileFoldersRelations = relations(fileFolders, ({ one }) => ({
  workspace: one(workspaces, {
    fields: [fileFolders.workspaceId],
    references: [workspaces.id],
  }),
  parentFolder: one(fileFolders, {
    fields: [fileFolders.parentFolderId],
    references: [fileFolders.id],
  }),
}));
