"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { AssetIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import type { Asset } from "@/types";

export const columns: ColumnDef<Asset>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const asset = row.original;

      return (
        <Link
          className="flex w-fit items-center gap-2 hover:underline"
          href={`/agent/assets/${asset.id}`}
        >
          <AssetIcon className="size-4 text-muted-foreground" />
          <span className="text-sm">{asset.name}</span>
        </Link>
      );
    },
  },
  {
    accessorKey: "category.name",
    header: "Category",
  },
  {
    accessorKey: "status.name",
    header: "Status",
    cell: ({ row }) => {
      const asset = row.original;

      return (
        <Badge variant="secondary">
          <div
            className="mr-0.5 size-2 rounded-full"
            style={{ backgroundColor: asset.status.color }}
          />
          {asset.status.name}
        </Badge>
      );
    },
  },
  {
    accessorKey: "manufacturer.name",
    header: "Manufacturer",
    cell: ({ row }) => {
      const asset = row.original;

      return asset.manufacturer?.name ?? "-";
    },
  },
  {
    accessorKey: "model.name",
    header: "Model",
    cell: ({ row }) => {
      const asset = row.original;

      return asset.model?.name ?? "-";
    },
  },
];
