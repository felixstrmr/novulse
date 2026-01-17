import { notFound } from "next/navigation";
import AgentSidebarDropdown from "@/components/agent/agent-sidebar-dropdown";
import AgentSidebarNav from "@/components/agent/agent-sidebar-nav";
import { getWorkspaceUser } from "@/queries/workspace-users/get-workspace-user";
import { getWorkspace } from "@/queries/workspaces/get-workspace";
import { getSubdomain } from "@/utils/domain";

export default async function AgentSidebar({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  const subdomain = getSubdomain(domain);

  const [workspaceUser, workspace] = await Promise.all([
    getWorkspaceUser(subdomain),
    getWorkspace(subdomain),
  ]);

  if (!(workspaceUser && workspace)) {
    notFound();
  }

  return (
    <aside className="flex min-w-64 max-w-64 flex-col gap-3 border-r bg-zinc-900/50 p-3">
      <AgentSidebarDropdown workspace={workspace} />
      <AgentSidebarNav />
    </aside>
  );
}
