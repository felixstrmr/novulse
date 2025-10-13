import { SearchIcon } from "lucide-react";
import { redirect } from "next/navigation";
import SidebarDropdown from "@/components/_layouts/dashboard/sidebar/dropdown";
import SidebarNavigation from "@/components/_layouts/dashboard/sidebar/navigation";
import { getWorkspaces } from "@/queries/workspaces";

export default async function Sidebar({ subdomain }: { subdomain: string }) {
  const workspaces = await getWorkspaces();

  const activeWorkspace = workspaces.find(
    (workspace) => workspace.domain === subdomain
  );

  if (!activeWorkspace) {
    redirect("/signin");
  }

  return (
    <aside className="flex min-w-64 max-w-64 flex-col gap-3 rounded-lg bg-background p-3">
      <div className="flex items-center justify-between gap-2">
        <SidebarDropdown
          activeWorkspace={activeWorkspace}
          workspaces={workspaces}
        />
        <div className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md hover:bg-muted">
          <SearchIcon className="size-4" />
        </div>
      </div>
      <SidebarNavigation />
    </aside>
  );
}
