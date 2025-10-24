import { Suspense } from "react";
import TaskSidebar from "@/components/layout/task-sidebar";
import TaskSidebarSkeleton from "@/components/skeletons/task-sidebar-skeleton";

export default function TaskLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="absolute inset-0 flex size-full gap-1 bg-muted p-1">
      <Suspense fallback={<TaskSidebarSkeleton />}>
        <TaskSidebar />
      </Suspense>
      {children}
    </div>
  );
}
