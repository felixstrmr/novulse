import { SearchIcon } from "lucide-react";
import { redirect } from "next/navigation";
import DashboardSidebarNav from "@/components/dashboard/dashboard-sidebar-nav";
import DashboardSidebarWorkspaces from "@/components/dashboard/dashboard-sidebar-workspaces";
import { supabaseClient } from "@/lib/clients/supabase-client";
import { getUser } from "@/queries/users";
import { getWorkspaces } from "@/queries/workspaces";

export default async function DashboardSidebar({
  subdomain,
}: {
  subdomain: string;
}) {
  const supabase = await supabaseClient();
  const user = await getUser(supabase);

  if (!user) {
    redirect("/signin");
  }

  const [workspaces] = await Promise.all([getWorkspaces(supabase, user.id)]);

  const activeWorkspace = workspaces.find(
    (workspace) => workspace.domain === subdomain
  );

  return (
    <aside className="flex min-w-64 max-w-64 flex-col gap-3 rounded-lg bg-background p-3">
      <div className="flex items-center justify-between gap-2">
        <DashboardSidebarWorkspaces
          activeWorkspace={activeWorkspace ?? workspaces[0]}
          workspaces={workspaces}
        />
        <div className="flex size-8 cursor-pointer items-center justify-center rounded-md hover:bg-muted">
          <SearchIcon className="size-4 text-muted-foreground" />
        </div>
      </div>
      <DashboardSidebarNav />
    </aside>
  );
}
