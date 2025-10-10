import { Suspense } from "react";
import Tasks from "@/components/pages/tasks";
import TasksSkeleton from "@/components/skeletons/tasks-skeleton";

export default function TasksPage() {
  return (
    <Suspense fallback={<TasksSkeleton />}>
      <Tasks />
    </Suspense>
  );
}
