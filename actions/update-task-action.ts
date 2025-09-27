"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import z from "zod";
import { db } from "@/db";
import { tasks } from "@/db/schema";
import { authActionClient } from "@/lib/clients/action-client";

export const updateTaskAction = authActionClient
  .metadata({
    name: "update-task-action",
  })
  .inputSchema(
    z.object({
      id: z.uuid().min(1),
      statusId: z.uuid().optional(),
    })
  )
  .action(async ({ parsedInput }) => {
    const { id, statusId } = parsedInput;

    await db.update(tasks).set({ statusId }).where(eq(tasks.id, id));

    revalidatePath("/dashboard/tasks", "page");
  });
