import Link from "next/link";
import { UsersTable } from "@/components/agent/users/users-table";
import { columns } from "@/components/agent/users/users-table-columns";
import { buttonVariants } from "@/components/ui/button";
import { getWorkspaceUsers } from "@/queries/workspace-users/get-workspace-users";
import { getSubdomain } from "@/utils/domain";

export default async function UsersPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  const subdomain = getSubdomain(domain);
  const workspaceUsers = await getWorkspaceUsers(subdomain);

  return (
    <div className="flex size-full flex-col">
      <div className="flex items-center justify-between p-3">
        <h1 className="font-semibold text-2xl tracking-tight">Users</h1>
        <Link
          className={buttonVariants({ variant: "default" })}
          href="/agent/users/create"
        >
          Create user
        </Link>
      </div>
      <UsersTable columns={columns} data={workspaceUsers} />
    </div>
  );
}
