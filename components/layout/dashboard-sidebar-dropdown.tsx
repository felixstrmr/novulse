"use client";

import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signoutAction } from "@/actions/signout-action";
import { SettingsIcon } from "@/components/icons";
import { SignoutIcon } from "@/components/icons/signout-icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Workspace } from "@/types";
import { cn } from "@/utils/ui";

export default function DashboardSidebarDropdown({
  workspaces,
  activeWorkspace,
}: {
  workspaces: Workspace[];
  activeWorkspace: Workspace;
}) {
  const router = useRouter();

  const [isOpen, setOpen] = useState(false);

  const handleSignOut = async () => {
    await signoutAction();

    router.push("/signin");
  };

  return (
    <DropdownMenu onOpenChange={setOpen} open={isOpen}>
      <DropdownMenuTrigger
        className={cn(
          "flex h-8 cursor-pointer items-center gap-2 truncate rounded-md pr-2 pl-1",
          isOpen ? "bg-muted" : "bg-transparent hover:bg-muted"
        )}
      >
        <div className="flex size-6 shrink-0 items-center justify-center rounded-sm border bg-muted">
          <p className="text-muted-foreground text-xs">
            {activeWorkspace.name.charAt(0).toUpperCase()}
          </p>
        </div>
        <span className="truncate text-sm">{activeWorkspace.name}</span>
        <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-58">
        <DropdownMenuItem asChild>
          <Link href="/dashboard/settings">
            <SettingsIcon className="shrink-0" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
        {workspaces.map((workspace) => (
          <DropdownMenuItem className="gap-1.5 pl-1" key={workspace.id}>
            <div className="flex size-5 shrink-0 items-center justify-center rounded-[4px] border bg-muted">
              <p className="text-muted-foreground text-xxs">
                {workspace.name.charAt(0).toUpperCase()}
              </p>
            </div>
            <span className="truncate text-sm">{workspace.name}</span>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} variant="destructive">
          <SignoutIcon className="shrink-0" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
