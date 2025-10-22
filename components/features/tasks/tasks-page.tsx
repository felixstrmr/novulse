import { TasksIcon } from "@/components/icons";
import { getTasks } from "@/queries/task";
import { getSubdomain } from "@/utils/domain";

export default async function TasksPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  const subdomain = getSubdomain(domain);

  const tasks = await getTasks(subdomain);

  return (
    <div className="flex size-full flex-col">
      <div className="border-b p-3">
        <div className="flex items-center gap-1.5">
          <TasksIcon className="size-4 text-muted-foreground" />
          <h1 className="font-semibold text-xl tracking-tight">Tasks</h1>
        </div>
      </div>
      <pre>{JSON.stringify(tasks, null, 2)}</pre>
    </div>
  );
}
