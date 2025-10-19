import { SearchIcon } from "lucide-react";
import { notFound } from "next/navigation";
import DashboardSidebarDropdown from "@/components/layout/dashboard-sidebar-dropdown";
import DashboardSidebarNav from "@/components/layout/dashboard-sidebar-nav";
import { getWorkspaces } from "@/queries/workspace";
import { getWorkspaceUser } from "@/queries/workspace-user";

export default async function DashboardSidebar({
  subdomain,
}: {
  subdomain: string;
}) {
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
    <aside className="flex min-w-64 max-w-64 flex-col gap-3 border-r p-3">
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
