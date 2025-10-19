"use client";

import { ChevronDownIcon, LogOutIcon, SettingsIcon } from "lucide-react";
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

export default function DashboardSidebarDropdown({
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
          "flex h-8 cursor-pointer items-center gap-2 truncate rounded-md pr-2 pl-1",
          isOpen ? "bg-muted" : "bg-transparent hover:bg-muted"
        )}
      >
        <div className="flex size-6 shrink-0 items-center justify-center rounded-sm bg-orange-100">
          <p className="text-orange-500 text-xs">
            {activeWorkspace.name.charAt(0).toUpperCase()}
          </p>
        </div>
        <span className="truncate text-sm">{activeWorkspace.name}</span>
        <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-58">
        <DropdownMenuItem>
          <SettingsIcon className="shrink-0" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
        {workspaces.map((workspace) => (
          <DropdownMenuItem className="gap-1.5 pl-1" key={workspace.id}>
            <div className="flex size-5 shrink-0 items-center justify-center rounded-[4px] bg-orange-100">
              <p className="text-orange-500 text-xxs">
                {workspace.name.charAt(0).toUpperCase()}
              </p>
            </div>
            <span className="truncate text-sm">{workspace.name}</span>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOutIcon className="shrink-0" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
