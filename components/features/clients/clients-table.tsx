import { format } from "date-fns";
import Link from "next/link";
import Avatar from "@/components/common/avatar";
import ClientStatusBadge from "@/components/common/client-status-badge";
import type { Client } from "@/types";

export default function ClientsTable({ clients }: { clients: Client[] }) {
  return (
    <div className="rounded-lg bg-muted p-1">
      <div className="grid grid-cols-4 p-3 text-muted-foreground text-sm">
        <div>Name</div>
        <div>Status</div>
        <div>Created</div>
        <div>Actions</div>
      </div>
      <div className="rounded-md border">
        {clients.map((client) => (
          <Link
            className="grid grid-cols-4 items-center border-b bg-background p-3 text-sm first:rounded-t-md last:rounded-b-md last:border-b-0 hover:bg-zinc-50"
            href={`/dashboard/clients/${client.id}`}
            key={client.id}
          >
            <div className="flex items-center gap-2">
              <Avatar size="sm" value={client.name} />
              {client.name}
            </div>
            <ClientStatusBadge isActive={client.is_active} />
            <div>{format(client.created_at, "PP")}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
