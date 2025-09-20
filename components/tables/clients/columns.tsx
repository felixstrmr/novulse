"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import Avatar from "@/components/avatar";
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
      const { id, name, image } = row.original;

      return (
        <Link
          className="group flex items-center gap-2"
          href={`/dashboard/clients/${id}`}
        >
          <Avatar image={image} size="sm" value={name} />
          <span className="text-sm group-hover:underline">{name}</span>
        </Link>
      );
    },
  },
  {
    accessorKey: "website",
    header: "Website",
    cell: ({ row }) => {
      const { website } = row.original;

      const formattedWebsite = website
        ?.replace("https://", "")
        .replace("http://", "");

      return website ? (
        <Link className="hover:underline" href={website} target="_blank">
          {formattedWebsite}
        </Link>
      ) : (
        "-"
      );
    },
  },
];
