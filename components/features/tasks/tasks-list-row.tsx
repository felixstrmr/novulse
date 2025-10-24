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
    <div className="flex flex-col rounded-lg bg-muted p-0.5">
      <div className="flex items-center gap-2 p-2">
        <div
          className="size-2 rounded-full"
          style={{ backgroundColor: status.color }}
        />
        <p className="text-sm">{status.name}</p>
        <p className="text-muted-foreground text-xs">{tasks.length}</p>
      </div>
      {tasks.length > 0 && (
        <div className="relative h-full">
          <div className="grid grid-cols-4 px-3 py-1.5">
            <p className="text-muted-foreground text-xs">Name</p>
            <p className="text-muted-foreground text-xs">Description</p>
            <p className="text-muted-foreground text-xs">Project</p>
            <p className="text-muted-foreground text-xs">Target Date</p>
          </div>
          <div className="flex flex-col">
            {tasks.map((task) => (
              <TasksListItem key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
