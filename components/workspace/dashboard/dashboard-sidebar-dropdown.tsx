"use client";

import { CheckIcon, ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { LogOutIcon, SettingsIcon } from "@/components/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Workspace } from "@/types";
import { cn, getFullWorkspaceUrl } from "@/utils";

export default function DashboardSidebarDropdown({
  workspaces,
  currentWorkspace,
}: {
  workspaces: Workspace[];
  currentWorkspace: Workspace;
}) {
  const router = useRouter();

  const [isOpen, setOpen] = React.useState(false);

  return (
    <DropdownMenu onOpenChange={setOpen} open={isOpen}>
      <DropdownMenuTrigger
        className={cn(
          "flex h-8 cursor-pointer items-center gap-2 rounded-md pr-2 pl-1 hover:bg-muted",
          isOpen && "bg-muted"
        )}
      >
        <div className="relative inset-shadow-2xs inset-shadow-zinc-500 size-6 rounded-[5px] border border-primary bg-primary shadow-xs before:absolute before:inset-0 before:rounded-[4px] before:bg-linear-to-b before:from-white/25 before:to-transparen">
          <span className="text-primary-foreground uppercase">
            {currentWorkspace.name.charAt(0)}
          </span>
        </div>
        <p className="text-sm">{currentWorkspace.name}</p>
        <ChevronsUpDown className="size-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-58">
        <DropdownMenuItem asChild>
          <Link href="/dashboard/settings">
            <SettingsIcon />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
        {workspaces.map((workspace) => (
          <DropdownMenuItem
            key={workspace.id}
            onClick={() => router.push(getFullWorkspaceUrl(workspace.domain))}
          >
            <p className="text-sm">{workspace.name}</p>
            {workspace.id === currentWorkspace.id && (
              <CheckIcon className="ml-auto size-3.5 text-muted-foreground" />
            )}
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
