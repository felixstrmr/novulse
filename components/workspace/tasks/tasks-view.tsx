import TasksKanbanView from "@/components/workspace/tasks/tasks-kanban-view";
import { getTaskStatuses } from "@/queries/task-statuses";
import { getTasks } from "@/queries/tasks";

export default async function TasksView({ domain }: { domain: string }) {
  const [tasks, taskStatuses] = await Promise.all([
    getTasks(domain),
    getTaskStatuses(domain),
  ]);

  if (tasks.length === 0) {
    return (
      <div className="flex size-full items-center justify-center">
        No tasks found
      </div>
    );
  }

  return <TasksKanbanView taskStatuses={taskStatuses} tasks={tasks} />;
}
