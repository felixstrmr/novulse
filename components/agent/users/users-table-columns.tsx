"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Avatar from "@/components/common/avatar";
import type { WorkspaceUser } from "@/types";

export const columns: ColumnDef<WorkspaceUser>[] = [
  {
    accessorKey: "user.email",
    header: "Email",
    cell: ({ row }) => {
      const workspaceUser = row.original;

      return (
        <div className="flex items-center gap-2">
          <Avatar
            avatar={workspaceUser.user.avatar}
            size="sm"
            value={workspaceUser.user.email}
          />
          <span>{workspaceUser.user.email}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
  },
];
