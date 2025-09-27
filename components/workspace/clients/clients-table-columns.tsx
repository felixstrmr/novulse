"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Client } from "@/types";

export const clientsTableColumns: ColumnDef<Client>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
];
