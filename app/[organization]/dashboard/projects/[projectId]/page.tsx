import CreateTaskDialog from "@/components/dialogs/create-task-dialog";
import EmptyState from "@/components/empty-state";
import { TaskIcon } from "@/components/icons/task-icon";
import { Badge } from "@/components/ui/badge";
import TasksKanbanView from "@/components/views/tasks/tasks-kanban-view";
import { getTasksByProjectId } from "@/queries/tasks";

type Props = {
  params: Promise<{ organization: string; projectId: string }>;
};

export default async function Page({ params }: Props) {
  const { organization, projectId } = await params;

  const tasks = await getTasksByProjectId(organization, projectId);

  return (
    <div className="size-full rounded-lg bg-background">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <h1 className="font-semibold text-2xl tracking-tight">Tasks</h1>
          <Badge variant="secondary">{tasks.length}</Badge>
        </div>
        <div>
          <CreateTaskDialog />
        </div>
      </div>
      {tasks.length > 0 ? (
        <TasksKanbanView tasks={[]} />
      ) : (
        <div className="flex size-full items-center justify-center">
          <EmptyState
            description="Create a task to get started"
            icon={TaskIcon}
            title="No tasks found"
          />
        </div>
      )}
    </div>
  );
}
