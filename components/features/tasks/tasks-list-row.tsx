import TasksListItem from "@/components/features/tasks/tasks-list-item";
import type { Task, TaskStatus } from "@/types";

export default function TasksListRow({
  status,
  tasks,
}: {
  status: TaskStatus;
  tasks: Task[];
}) {
  return (
    <div className="flex flex-col rounded-lg border border-border/50 bg-muted/50 p-1">
      <div className="flex items-center gap-2 p-2">
        <div
          className="size-2 rounded-full"
          style={{ backgroundColor: status.color }}
        />
        <p className="text-sm">{status.name}</p>
        <p className="text-muted-foreground text-xs">{tasks.length}</p>
      </div>
      {tasks.length > 0 && (
        <div className="relative h-full space-y-1">
          <div className="grid grid-cols-4 px-3 py-1">
            <p className="text-muted-foreground text-xs">Name</p>
            <p className="text-muted-foreground text-xs">Type</p>
            <p className="text-muted-foreground text-xs">Project</p>
            <p className="text-muted-foreground text-xs">Due Date</p>
          </div>
          {tasks.map((task) => (
            <TasksListItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}
