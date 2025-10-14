import { Suspense } from "react";
import DashboardSidebar from "@/app/[domain]/dashboard/_components/sidebar";
import SidebarSkeleton from "@/app/[domain]/dashboard/_components/sidebar-skeleton";
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
      <Suspense fallback={<SidebarSkeleton />}>
        <DashboardSidebar subdomain={subdomain} />
      </Suspense>
      <div className="flex size-full overflow-hidden rounded-lg bg-background">
        {children}
      </div>
    </div>
  );
}
