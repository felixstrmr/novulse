import { schemaTask } from "@trigger.dev/sdk/v3";
import z from "zod";
import { db } from "@/db";
import { projectUsers } from "@/db/schema";

export const setupProjectTask = schemaTask({
  id: "setup-project-task",
  schema: z.object({
    organizationId: z.string(),
    projectId: z.string(),
    userId: z.string(),
  }),
  run: async (input) => {
    const { organizationId, projectId, userId } = input;

    await db.insert(projectUsers).values({
      organizationId,
      projectId,
      userId,
      role: "Lead",
    });
  },
});
