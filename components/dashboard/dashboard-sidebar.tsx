import { notFound } from "next/navigation";
import DashboardSidebarDropdown from "@/components/dashboard/dashboard-sidebar-dropdown";
import DashboardSidebarNav from "@/components/dashboard/dashboard-sidebar-nav";
import { getWorkspaces } from "@/queries/workspaces";

export default async function DashboardSidebar({
  subdomain,
}: {
  subdomain: string;
}) {
  const workspaces = await getWorkspaces();

  const activeWorkspace = workspaces.find(
    (workspace) => workspace.domain === subdomain
  );

  if (!activeWorkspace) {
    console.error("Active workspace not found");
    notFound();
  }

  return (
    <div className="flex min-w-64 max-w-64 flex-col gap-3 rounded-lg bg-background p-3">
      <DashboardSidebarDropdown
        activeWorkspace={activeWorkspace}
        workspaces={workspaces}
      />
      <DashboardSidebarNav />
    </div>
  );
}
