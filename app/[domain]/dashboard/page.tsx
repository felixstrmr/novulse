import { Suspense } from "react";
import Dashboard from "@/components/pages/dashboard";
import DashbaordSkeleton from "@/components/skeletons/dashboard-skeleton";

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashbaordSkeleton />}>
      <Dashboard />
    </Suspense>
  );
}
