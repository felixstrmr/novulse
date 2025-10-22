import { SearchIcon } from "lucide-react";
import { notFound } from "next/navigation";
import DashboardSidebarDropdown from "@/components/layout/dashboard-sidebar-dropdown";
import DashboardSidebarNav from "@/components/layout/dashboard-sidebar-nav";
import { getWorkspaces } from "@/queries/workspace";
import { getWorkspaceUser } from "@/queries/workspace-user";
import { getSubdomain } from "@/utils/domain";

export default async function DashboardSidebar({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  const subdomain = getSubdomain(domain);

  const [workspaceUser, workspaces] = await Promise.all([
    getWorkspaceUser(subdomain),
    getWorkspaces(),
  ]);

  const activeWorkspace = workspaces.find(
    (workspace) => workspace.domain === subdomain
  );

  if (!(workspaceUser && activeWorkspace)) {
    notFound();
  }

  return (
    <aside className="flex min-w-64 max-w-64 flex-col gap-3 border-r bg-muted/25 p-3">
      <div className="flex items-center justify-between gap-2">
        <DashboardSidebarDropdown
          activeWorkspace={activeWorkspace}
          workspaces={workspaces}
        />
        <div className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md hover:bg-foreground/5">
          <SearchIcon className="size-4" />
        </div>
      </div>
      <DashboardSidebarNav />
    </aside>
  );
}
