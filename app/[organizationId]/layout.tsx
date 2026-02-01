import { Suspense } from "react";
import OrganizationSidebar from "@/components/organization/organization-sidebar";
import OrganizationSidebarSkeleton from "@/components/skeletons/organization-sidebar-skeleton";

export default function OrganizationLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ organizationId: string }>;
}) {
  return (
    <div className="flex size-full gap-1 bg-muted p-1">
      <Suspense fallback={<OrganizationSidebarSkeleton />}>
        <OrganizationSidebar params={params} />
      </Suspense>

      {children}
    </div>
  );
}
