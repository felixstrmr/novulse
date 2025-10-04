import { Suspense } from "react";
import TasksViewSkeleton from "@/components/skeletons/tasks-view-skeleton";
import TasksView from "@/components/tasks/tasks-view";
import { getWorkspaceSubdomain } from "@/utils/workspace";

export default async function TasksPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  const subdomain = getWorkspaceSubdomain(domain);

  return (
    <div className="flex size-full flex-col rounded-lg bg-background">
      <Suspense fallback={<TasksViewSkeleton />}>
        <TasksView subdomain={subdomain} />
      </Suspense>
    </div>
  );
}
