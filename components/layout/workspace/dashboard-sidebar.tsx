import Link from "next/link";
import { redirect } from "next/navigation";
import { NovulseIcon } from "@/components/icons";
import DashboardSidebarNavigation from "@/components/layout/workspace/dashboard-sidebar-navigation";
import { getWorkspaceUser } from "@/queries/workspace-users";
import { getUniqueDomain } from "@/utils/domain";

export default async function DashbaordSidebar({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  const uniqueDomain = getUniqueDomain(domain);

  const workspaceUser = await getWorkspaceUser(uniqueDomain);

  if (!workspaceUser || workspaceUser.role === "client") {
    redirect("/denied");
  }

  return (
    <aside className="flex flex-col gap-3 rounded-xl bg-background p-3">
      <Link
        className="flex size-8 items-center justify-center rounded-md bg-primary"
        href="/dashboard"
      >
        <NovulseIcon className="size-4 text-primary-foreground" />
      </Link>
      <DashboardSidebarNavigation />
    </aside>
  );
}
