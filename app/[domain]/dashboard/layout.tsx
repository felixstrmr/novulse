import { Suspense } from "react";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import DashboardHeaderSkeleton from "@/components/skeletons/dashboard-header-skeleton";
import DashboardSidebarSkeleton from "@/components/skeletons/dashboard-sidebar-skeleton";
import { getWorkspaceSubdomain } from "@/utils/workspace";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  const subdomain = getWorkspaceSubdomain(domain);

  return (
    <div className="flex size-full gap-1 bg-muted p-1">
      <Suspense fallback={<DashboardSidebarSkeleton />}>
        <DashboardSidebar subdomain={subdomain} />
      </Suspense>

      <div className="flex size-full flex-col gap-1">
        <Suspense fallback={<DashboardHeaderSkeleton />}>
          <DashboardHeader />
        </Suspense>

        {children}
      </div>
    </div>
  );
}
