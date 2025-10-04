import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import { getWorkspaces } from "@/queries/workspaces";
import { getWorkspaceUrl } from "@/utils/workspace";

export default async function AppView() {
  const workspaces = await getWorkspaces();

  return (
    <div className="grid grid-cols-3 gap-1.5">
      {workspaces.map((workspace) => (
        <div
          className="flex flex-col gap-3 rounded-md border p-3"
          key={workspace.id}
        >
          <p className="font-semibold text-lg tracking-tight">
            {workspace.name}
          </p>
          <Link
            className="flex items-center gap-1.5 text-muted-foreground text-sm transition-colors hover:text-foreground"
            href={getWorkspaceUrl(workspace.domain)}
          >
            View
            <ArrowUpRightIcon className="size-3.5" />
          </Link>
        </div>
      ))}
    </div>
  );
}
