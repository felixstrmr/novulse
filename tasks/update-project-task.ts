import { schemaTask } from "@trigger.dev/sdk";
import { drizzle } from "drizzle-orm/node-postgres";
import z from "zod";
import * as schema from "@/db/schema";
import { activities } from "@/db/schema";

const db = drizzle(process.env.DATABASE_URL as string, { schema });

export const updateProjectTask = schemaTask({
  id: "update-project-task",
  schema: z.object({
    organizationId: z.uuid(),
    projectId: z.uuid(),
    userId: z.uuid(),
    oldStatus: z.string().optional(),
    newStatus: z.string().optional(),
  }),
  run: async (input) => {
    const { organizationId, projectId, userId, oldStatus, newStatus } = input;

    if (oldStatus && newStatus) {
      await db.insert(activities).values({
        organizationId,
        projectId,
        userId,
        type: "project_status_updated",
        description: `%USER% updated status from "${oldStatus}" to "${newStatus}"`,
      });
    }
  },
});
