import { redirect } from "next/navigation";
import DashboardSidebarDropdown from "@/components/workspace/dashboard/dashboard-sidebar-dropdown";
import DashboardSidebarNav from "@/components/workspace/dashboard/dashboard-sidebar-nav";
import { getSession } from "@/queries/sessions";
import { getWorkspaces } from "@/queries/workspaces";

export default async function DashboardSidebar({ domain }: { domain: string }) {
  const [session, workspaces] = await Promise.all([
    getSession(),
    getWorkspaces(),
  ]);

  const currentWorkspace = workspaces.find(
    (workspace) => workspace.domain === domain
  );

  if (!(session && currentWorkspace)) {
    redirect("/signin");
  }

  return (
    <div className="flex w-64 min-w-64 max-w-64 flex-col items-start gap-6 rounded-lg bg-background p-3">
      <DashboardSidebarDropdown
        currentWorkspace={currentWorkspace}
        workspaces={workspaces.map((workspace) => workspace)}
      />
      <DashboardSidebarNav />
    </div>
  );
}
