"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import Avatar from "@/components/common/avatar";
import ClientStatusBadge from "@/components/common/client-status-badge";
import type { Client } from "@/types";

export const ClientsTableColumns: ColumnDef<Client>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <Link
        className="flex items-center gap-2"
        href={`/dashboard/clients/${row.original.id}`}
      >
        <Avatar size="sm" value={row.original.name} />
        {row.original.name}
      </Link>
    ),
  },
  {
    accessorKey: "is_active",
    header: "Status",
    cell: ({ row }) => {
      const client = row.original;

      return <ClientStatusBadge isActive={client.is_active} />;
    },
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
];
