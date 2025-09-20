import { schemaTask } from "@trigger.dev/sdk";
import { drizzle } from "drizzle-orm/node-postgres";
import z from "zod";
import * as schema from "@/db/schema";
import { activities, projectUsers } from "@/db/schema";

const db = drizzle(process.env.DATABASE_URL as string, { schema });

export const createProjectTask = schemaTask({
  id: "create-project-task",
  schema: z.object({
    organizationId: z.uuid(),
    projectId: z.uuid(),
    userId: z.uuid(),
  }),
  run: async (input) => {
    const { organizationId, projectId, userId } = input;

    await Promise.all([
      db.insert(projectUsers).values({
        organizationId,
        projectId,
        userId,
        role: "Lead",
      }),
      db.insert(activities).values({
        organizationId,
        projectId,
        userId,
        type: "project_created",
        description: "%USER% created the project",
      }),
    ]);
  },
});
