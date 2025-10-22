import { Suspense } from "react";
import TasksPage from "@/components/features/tasks/tasks-page";
import TasksPageSkeleton from "@/components/skeletons/tasks-page-skeleton";

export default function Page({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  return (
    <Suspense fallback={<TasksPageSkeleton />}>
      <TasksPage params={params} />
    </Suspense>
  );
}
