import { Suspense } from "react";
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
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
      {children}
    </div>
  );
}
