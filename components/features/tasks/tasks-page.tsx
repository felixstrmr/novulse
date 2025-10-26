import Link from "next/link";
import TasksHeader from "@/components/features/tasks/tasks-header";
import TasksList from "@/components/features/tasks/tasks-list";
import { TasksIcon } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { getClients } from "@/queries/client";
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

  const [tasks, statuses, clients] = await Promise.all([
    getTasks(subdomain),
    getTaskStatuses(subdomain),
    getClients(subdomain, "name", "asc"),
  ]);

  return (
    <div className="flex size-full flex-col rounded-lg bg-background">
      <div className="flex items-center justify-between border-b p-3">
        <div className="flex items-center gap-1.5">
          <TasksIcon className="size-4 text-muted-foreground" />
          <h1 className="font-semibold text-xl tracking-tight">Tasks</h1>
        </div>
        <Link
          className={buttonVariants({ variant: "default" })}
          href="/dashboard/tasks/create"
        >
          Create task
        </Link>
      </div>
      <div className="flex size-full flex-col gap-3 p-3">
        <TasksHeader clients={clients} />
        <TasksList statuses={statuses} tasks={tasks} />
      </div>
    </div>
  );
}
