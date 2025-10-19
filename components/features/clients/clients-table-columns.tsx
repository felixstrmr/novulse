"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Client } from "@/types";

export const ClientsTableColumns: ColumnDef<Client>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const client = row.original;

      return (
        <div className="flex items-center gap-2">
          <div className="flex size-6 shrink-0 items-center justify-center rounded-sm border bg-muted">
            <p className="text-muted-foreground text-xs">
              {client.name.charAt(0).toUpperCase()}
            </p>
          </div>
          <span className="truncate text-sm">{client.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
];
