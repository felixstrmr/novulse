import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import TaskSidebarTabs from "@/components/workspace/task/task-sidebar-tabs";
import { getTaskById } from "@/queries/tasks";

export default async function TaskSidebar({
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
    <aside className="w-96 min-w-96 max-w-96 rounded-lg bg-background">
      <div className="flex items-center gap-2 border-b p-3">
        <Link
          className={buttonVariants({ variant: "ghost", size: "icon" })}
          href="/dashboard/tasks"
        >
          <ArrowLeftIcon />
        </Link>
        <h1 className="font-semibold text-2xl tracking-tight">{task.name}</h1>
      </div>
      <TaskSidebarTabs />
    </aside>
  );
}
