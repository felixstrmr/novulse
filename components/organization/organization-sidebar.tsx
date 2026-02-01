import { NovulseIcon } from "@/components/icons";
import OrganizationSidebarNavigation from "@/components/organization/organization-sidebar-navigation";

export default async function OrganizationSidebar({
  params,
}: {
  params: Promise<{ organizationId: string }>;
}) {
  const { organizationId } = await params;

  return (
    <aside className="flex min-w-64 max-w-64 flex-col gap-3 rounded-xl border border-border/75 bg-background p-3 shadow-xs">
      <div className="flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-md bg-muted">
          <NovulseIcon className="size-4" />
        </div>
        <h1 className="font-semibold text-xl tracking-tight">NovulsePDF</h1>
      </div>
      <OrganizationSidebarNavigation organizationId={organizationId} />
    </aside>
  );
}
