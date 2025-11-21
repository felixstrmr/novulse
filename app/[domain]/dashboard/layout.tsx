import { Suspense } from "react";
import DashboardSidebar from "@/components/layout/workspace/dashboard-sidebar";
import DashboardSidebarSkeleton from "@/components/layout/workspace/dashboard-sidebar-skeleton";

export default function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ domain: string }>;
}) {
  return (
    <div className="flex size-full gap-1 bg-muted p-1">
      <Suspense fallback={<DashboardSidebarSkeleton />}>
        <DashboardSidebar params={params} />
      </Suspense>
      {children}
    </div>
  );
}
