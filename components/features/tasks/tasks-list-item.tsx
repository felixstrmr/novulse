"use client";

import { CalendarX2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ProjectsIcon } from "@/components/icons";
import type { Task } from "@/types";
import { formatRelativeTime } from "@/utils/date";

export default function TasksListItem({ task }: { task: Task }) {
  const router = useRouter();

  return (
    <button
      className="grid w-full cursor-pointer grid-cols-4 place-items-start border bg-background p-3 shadow-xs first:rounded-t-md last:rounded-b-md only:rounded-md even:border-t-0 hover:bg-zinc-50"
      onClick={() => router.push(`/dashboard/tasks/${task.id}`)}
      type="button"
    >
      <p className="text-sm">{task.name}</p>
      <p className="text-sm">{task.description ?? "-"}</p>
      <div className="flex items-center gap-1.5">
        <ProjectsIcon className="size-4 text-zinc-400" />
        <p className="text-sm">{task.project.name}</p>
      </div>
      <p className="text-sm">
        {task.target_date ? (
          <span className="flex items-center gap-1.5">
            <CalendarX2Icon className="size-4 text-muted-foreground" />
            {formatRelativeTime(task.target_date)}
          </span>
        ) : (
          "N/A"
        )}
      </p>
    </button>
  );
}
