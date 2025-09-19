import { relations } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { clients } from "@/db/schema/clients";
import { organizations } from "@/db/schema/organizations";
import { PROJECT_PRIORITIES, PROJECT_STATUSES } from "@/lib/constants";

const projectStatus = pgEnum("project_status", PROJECT_STATUSES);
const priority = pgEnum("priority", PROJECT_PRIORITIES);

export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  priority: priority("priority").notNull().default("Medium"),
  status: projectStatus("status").notNull().default("Not Started"),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),

  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
  clientId: uuid("client_id")
    .notNull()
    .references(() => clients.id, { onDelete: "restrict" }),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const projectsRelations = relations(projects, ({ one }) => ({
  organization: one(organizations, {
    fields: [projects.organizationId],
    references: [organizations.id],
  }),
  client: one(clients, {
    fields: [projects.clientId],
    references: [clients.id],
  }),
}));
