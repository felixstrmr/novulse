import { Suspense } from "react";
import TaskSidebarSkeleton from "@/components/skeletons/task-sidebar-skeleton";
import TaskHeader from "@/components/workspace/task/task-header";
import TaskSidebar from "@/components/workspace/task/task-sidebar";
import { extractDomain } from "@/utils";

export default async function TaskLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ workspace: string; taskId: string }>;
}) {
  const { workspace, taskId } = await params;
  const domain = extractDomain(workspace);

  return (
    <div className="absolute inset-0 flex size-full gap-1 bg-muted p-1">
      <Suspense fallback={<TaskSidebarSkeleton />}>
        <TaskSidebar domain={domain} taskId={taskId} />
      </Suspense>
      <div className="flex size-full flex-col gap-1">
        <TaskHeader />
        {children}
      </div>
    </div>
  );
}
