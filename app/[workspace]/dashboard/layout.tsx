import { Suspense } from "react";
import DashboardHeaderSkeleton from "@/components/skeletons/dashboard-header-skeleton";
import DashboardSidebarSkeleton from "@/components/skeletons/dashboard-sidebar-skeleton";
import DashboardHeader from "@/components/workspace/dashboard/dashboard-header";
import DashboardSidebar from "@/components/workspace/dashboard/dashboard-sidebar";
import { extractDomain } from "@/utils";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ workspace: string }>;
}) {
  const { workspace } = await params;
  const domain = extractDomain(workspace);

  return (
    <div className="flex size-full gap-1 overflow-hidden bg-muted p-1">
      <Suspense fallback={<DashboardSidebarSkeleton />}>
        <DashboardSidebar domain={domain} />
      </Suspense>
      <div className="flex size-full flex-col gap-1">
        <Suspense fallback={<DashboardHeaderSkeleton />}>
          <DashboardHeader />
        </Suspense>
        <div className="flex size-full flex-col gap-1 rounded-lg bg-background">
          {children}
        </div>
      </div>
    </div>
  );
}
