import { ListTodoIcon } from "lucide-react";
import CreateTaskDialog from "@/components/dialogs/create-task-dialog";
import TasksKanbanView from "@/components/tasks/tasks-kanban-view";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { getTaskPriorities } from "@/queries/task-priorities";
import { getTaskStatuses } from "@/queries/task-statuses";
import { getTasks } from "@/queries/tasks";

export default async function TasksView({ subdomain }: { subdomain: string }) {
  const [statuses, priorities, tasks] = await Promise.all([
    getTaskStatuses(subdomain),
    getTaskPriorities(subdomain),
    getTasks(subdomain),
  ]);

  if (tasks.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ListTodoIcon />
          </EmptyMedia>
        </EmptyHeader>
        <EmptyTitle>No tasks found</EmptyTitle>
        <EmptyDescription>Create a task to get started</EmptyDescription>
        <EmptyContent>
          <CreateTaskDialog priorities={priorities} statuses={statuses} />
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <div className="flex size-full flex-col">
      <div className="flex items-center justify-between border-b p-3">
        <h1 className="font-semibold text-2xl tracking-tight">Tasks</h1>
        <CreateTaskDialog priorities={priorities} statuses={statuses} />
      </div>
      <div className="flex size-full p-3">
        <TasksKanbanView statuses={statuses} tasks={tasks} />
      </div>
    </div>
  );
}
