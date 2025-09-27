import { notFound } from "next/navigation";
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
      <TaskSidebarTabs />
    </aside>
  );
}
