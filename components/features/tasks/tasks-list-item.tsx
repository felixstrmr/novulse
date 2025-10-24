"use client";

import { useRouter } from "next/navigation";
import { ProjectsIcon } from "@/components/icons";
import type { Task } from "@/types";
import { formatRelativeTime } from "@/utils/date";

export default function TasksListItem({ task }: { task: Task }) {
  const router = useRouter();

  return (
    <button
      className="grid w-full cursor-pointer grid-cols-4 place-items-start border bg-background p-3 shadow-xs first:rounded-t-md last:rounded-b-md even:border-t-0 hover:bg-zinc-50"
      onClick={() => router.push(`/dashboard/tasks/${task.id}`)}
      type="button"
    >
      <p className="text-sm">{task.name}</p>
      <p className="text-sm capitalize">{task.type}</p>
      <div className="flex items-center gap-1.5">
        <ProjectsIcon className="size-4 text-muted-foreground" />
        <p className="text-sm">{task.project.name}</p>
      </div>

      <p className="text-sm">
        {task.target_date ? formatRelativeTime(task.target_date) : "N/A"}
      </p>
    </button>
  );
}
