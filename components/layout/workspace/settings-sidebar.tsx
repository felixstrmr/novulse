import { redirect } from "next/navigation";
import SettingsSidebarNavigation from "@/components/layout/workspace/settings-sidebar-navigation";
import { getWorkspaceUser } from "@/queries/workspace-users";
import { getUniqueDomain } from "@/utils/domain";

export default async function SettingsSidebar({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  const uniqueDomain = getUniqueDomain(domain);

  const workspaceUser = await getWorkspaceUser(uniqueDomain);

  if (!workspaceUser) {
    redirect("/denied");
  }

  const isManager =
    workspaceUser.role === "manager" || workspaceUser.role === "owner";

  return (
    <aside className="min-w-64 max-w-64 rounded-xl bg-background p-3">
      <SettingsSidebarNavigation isManager={isManager} />
    </aside>
  );
}
