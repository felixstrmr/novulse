import TasksListRow from "@/components/features/tasks/tasks-list-row";
import type { Task, TaskStatus } from "@/types";

export default function TasksList({
  tasks,
  statuses,
}: {
  tasks: Task[];
  statuses: TaskStatus[];
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {statuses.map((status) => (
        <TasksListRow
          key={status.id}
          status={status}
          tasks={tasks.filter((task) => task.status === status.id)}
        />
      ))}
    </div>
  );
}
