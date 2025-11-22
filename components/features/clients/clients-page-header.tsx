import type { Client } from "@/types";

export default function ClientsPageHeader({ clients }: { clients: Client[] }) {
  const totalClients = clients.length;
  const activeClients = clients.filter((client) => client.is_active).length;

  return (
    <div className="grid grid-cols-4 gap-0.5 rounded-lg bg-muted p-0.5">
      <div className="rounded-md border bg-background p-3 shadow-xs">
        <p className="text-muted-foreground text-sm">Total clients</p>
        <h2 className="font-semibold text-lg tracking-tight">{totalClients}</h2>
      </div>
      <div className="rounded-md border bg-background p-3 shadow-xs">
        <p className="text-muted-foreground text-sm">Active clients</p>
        <h2 className="font-semibold text-lg tracking-tight">
          {activeClients}
        </h2>
      </div>
      <div className="rounded-md border bg-background p-3 shadow-xs">
        <p className="text-muted-foreground text-sm">Active clients</p>
        <h2 className="font-semibold text-lg tracking-tight">
          {activeClients}
        </h2>
      </div>
      <div className="rounded-md border bg-background p-3 shadow-xs">
        <p className="text-muted-foreground text-sm">Active clients</p>
        <h2 className="font-semibold text-lg tracking-tight">
          {activeClients}
        </h2>
      </div>
    </div>
  );
}
