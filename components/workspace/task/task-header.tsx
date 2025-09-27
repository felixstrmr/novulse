import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { getTaskById } from "@/queries/tasks";

export default async function TaskHeader({
  domain,
  taskId,
}: {
  domain: string;
  taskId: string;
}) {
  const task = await getTaskById(domain, taskId);

  if (!task) {
    notFound();
  }

  return (
    <div className="flex items-center justify-between rounded-lg bg-background p-3">
      <div className="flex items-center gap-2">
        <Link
          className={buttonVariants({ variant: "ghost", size: "icon" })}
          href="/dashboard/tasks"
        >
          <ArrowLeftIcon />
        </Link>
        <h1 className="font-semibold text-2xl tracking-tight">{task.name}</h1>
        <div className="ml-2 flex h-7 items-center gap-1.5 rounded-md bg-muted px-2">
          <div
            className="size-2 rounded-full"
            style={{ backgroundColor: task.status?.color }}
          />
          <p className="text-sm">{task.status?.name}</p>
        </div>
      </div>
    </div>
  );
}
