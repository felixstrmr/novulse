"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Client } from "@/types";

export const ClientsTableColumns: ColumnDef<Client>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
];
