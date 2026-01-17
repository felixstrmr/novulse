"use client";

import { ChevronsUpDownIcon } from "lucide-react";
import { useState } from "react";
import { LogoutIcon } from "@/components/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Workspace } from "@/types";
import { cn } from "@/utils/ui";

export default function AgentSidebarDropdown({
  workspace,
}: {
  workspace: Workspace;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerId = `workspace-dropdown-${workspace.id}`;

  return (
    <DropdownMenu onOpenChange={setIsOpen} open={isOpen}>
      <DropdownMenuTrigger
        className={cn(
          "flex h-8 cursor-pointer items-center gap-2 rounded-md pr-2 pl-1 transition-colors hover:bg-muted",
          isOpen && "bg-muted"
        )}
        id={triggerId}
      >
        <div className="flex size-6 shrink-0 items-center justify-center rounded-sm bg-blue-700 text-primary-foreground">
          <span className="text-xs">
            {workspace.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <span className="truncate text-sm">{workspace.name}</span>
        <ChevronsUpDownIcon className="ml-auto size-4 shrink-0 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            <LogoutIcon />
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
