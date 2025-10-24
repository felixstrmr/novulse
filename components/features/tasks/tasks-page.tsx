import TasksList from "@/components/features/tasks/tasks-list";
import { TasksIcon } from "@/components/icons";
import { getTasks } from "@/queries/task";
import { getTaskStatuses } from "@/queries/task-status";
import { getSubdomain } from "@/utils/domain";

export default async function TasksPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  const subdomain = getSubdomain(domain);

  const [tasks, statuses] = await Promise.all([
    getTasks(subdomain),
    getTaskStatuses(subdomain),
  ]);

  return (
    <div className="flex size-full flex-col rounded-lg bg-background">
      <div className="border-b p-3">
        <div className="flex items-center gap-1.5">
          <TasksIcon className="size-4 text-muted-foreground" />
          <h1 className="font-semibold text-xl tracking-tight">Tasks</h1>
        </div>
      </div>
      <div className="size-full p-3">
        <TasksList statuses={statuses} tasks={tasks} />
      </div>
    </div>
  );
}
