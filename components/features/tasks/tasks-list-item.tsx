import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import type { Task } from "@/types";
import { formatRelativeTime } from "@/utils/date";

export default function TasksListItem({ task }: { task: Task }) {
  return (
    <div className="grid grid-cols-4 rounded-md border bg-background p-3 shadow-xs">
      <p className="text-sm">{task.name}</p>
      <p className="text-sm capitalize">{task.type}</p>
      <Link
        className="flex items-center gap-2"
        href={`/dashboard/projects/${task.project.id}`}
      >
        <span className="text-sm">{task.project.name}</span>
        <ArrowUpRightIcon className="size-4" />
      </Link>
      <p className="text-sm">
        {task.target_date ? formatRelativeTime(task.target_date) : "N/A"}
      </p>
    </div>
  );
}
