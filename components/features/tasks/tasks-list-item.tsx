import type { Task } from "@/types";

export default function TasksListItem({ task }: { task: Task }) {
  return (
    <div className="grid grid-cols-4 rounded-md border bg-background p-3 shadow-xs">
      <p className="text-sm">{task.name}</p>
      <p className="text-sm capitalize">{task.type}</p>
    </div>
  );
}
