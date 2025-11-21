"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import type { Client } from "@/types";

export const ClientsTableColumns: ColumnDef<Client>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <Link href={`/dashboard/clients/${row.original.id}`}>
        {row.original.name}
      </Link>
    ),
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
];
