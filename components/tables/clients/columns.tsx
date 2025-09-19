"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Avvvatars from "avvvatars-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { Client } from "@/types";

export const clientColumns: ColumnDef<Client>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        aria-label="Select all"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label="Select row"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const { status } = row.original;

      return (
        <Badge className="capitalize" variant="outline">
          <div
            className={cn(
              "size-2 rounded-full",
              status === "active" ? "bg-green-500" : "bg-red-500"
            )}
          />
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const { name } = row.original;

      return (
        <div className="flex items-center gap-2">
          <Avvvatars radius={6} size={24} style="shape" value={name} />
          <span className="text-sm">{name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "website",
    header: "Website",
    cell: ({ row }) => {
      const { website } = row.original;

      return website ? website : "-";
    },
  },
];
