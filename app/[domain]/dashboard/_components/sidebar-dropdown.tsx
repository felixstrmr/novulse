"use client";

import { ChevronDownIcon, CogIcon, LogOutIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
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
import { getWorkspaceUrl } from "@/utils/workspace";

export default function SidebarDropdown({
  workspaces,
  activeWorkspace,
}: {
  workspaces: Workspace[];
  activeWorkspace: Workspace;
}) {
  const [isOpen, setOpen] = useState(false);

  return (
    <DropdownMenu onOpenChange={setOpen} open={isOpen}>
      <DropdownMenuTrigger
        className={cn(
          "flex h-8 cursor-pointer items-center gap-2 truncate rounded-md pr-2 pl-1 hover:bg-muted",
          isOpen && "bg-muted"
        )}
      >
        <div className="flex aspect-square size-6 items-center justify-center rounded-sm border bg-muted text-foreground">
          <p className="text-xs">{activeWorkspace.name[0].toUpperCase()}</p>
        </div>
        <span className="truncate text-sm">{activeWorkspace.name}</span>
        <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-58">
        <DropdownMenuItem asChild>
          <Link href="/dashboard/settings">
            <CogIcon />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
        {workspaces.map((workspace) => (
          <DropdownMenuItem asChild key={workspace.id}>
            <Link href={`${getWorkspaceUrl(workspace.domain)}/dashboard`}>
              {workspace.name}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
