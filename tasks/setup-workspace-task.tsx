import { createClient } from "@supabase/supabase-js";
import { schemaTask } from "@trigger.dev/sdk";
import z from "zod";
import type { Database } from "@/types/supabase";

const supabase = createClient<Database>(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SECRET_KEY as string
);

export const setupWorkspaceTask = schemaTask({
  id: "setup-workspace-task",
  schema: z.object({
    workspaceId: z.string(),
  }),
  run: async (input) => {
    const { workspaceId } = input;

    const defaultTaskStatuses = [
      {
        name: "Backlog",
        description: "Tasks that are not yet started",
        color: "#52525b",
        icon: "CircleDashed",
        order: 0,
      },
      {
        name: "Todo",
        description: "Tasks that are in progress",
        color: "#eab308",
        icon: "Circle",
        order: 1,
      },
      {
        name: "In Progress",
        description: "Tasks that are in progress",
        color: "#f59e0b",
        icon: "CirclePlay",
        order: 2,
      },
      {
        name: "Completed",
        description: "Tasks that are completed",
        color: "#22c55e",
        icon: "CircleCheck",
        order: 3,
      },
      {
        name: "Canceled",
        description: "Tasks that are canceled",
        color: "#ef4444",
        icon: "CircleX",
        order: 4,
      },
    ];

    const defaultTaskPriorities = [
      {
        name: "Low",
        description: "Low priority",
        color: "#52525b",
        icon: "CircleDashed",
        order: 0,
      },
      {
        name: "Medium",
        description: "Medium priority",
        color: "#eab308",
        icon: "Circle",
        order: 1,
      },
      {
        name: "High",
        description: "High priority",
        color: "#f59e0b",
        icon: "CirclePlay",
        order: 2,
      },
      {
        name: "Critical",
        description: "Critical priority",
        color: "#ef4444",
        icon: "CircleX",
        order: 3,
      },
    ];

    const defaultProjectStatuses = [
      {
        name: "Backlog",
        description: "Projects that are not yet started",
        color: "#52525b",
        icon: "CircleDashed",
        order: 0,
      },
      {
        name: "Planned",
        description: "Projects that are planned",
        color: "#eab308",
        icon: "Circle",
        order: 1,
      },
      {
        name: "In Progress",
        description: "Projects that are in progress",
        color: "#f59e0b",
        icon: "CirclePlay",
        order: 2,
      },
      {
        name: "Completed",
        description: "Projects that are completed",
        color: "#22c55e",
        icon: "CircleCheck",
        order: 3,
      },
      {
        name: "Canceled",
        description: "Projects that are canceled",
        color: "#ef4444",
        icon: "CircleX",
        order: 4,
      },
    ];

    await Promise.all([
      supabase.from("task_statuses").insert(
        defaultTaskStatuses.map((status) => ({
          ...status,
          workspace: workspaceId,
        }))
      ),
      supabase.from("task_priorities").insert(
        defaultTaskPriorities.map((priority) => ({
          ...priority,
          workspace: workspaceId,
        }))
      ),
      supabase.from("project_statuses").insert(
        defaultProjectStatuses.map((status) => ({
          ...status,
          workspace: workspaceId,
        }))
      ),
    ]);
  },
});
