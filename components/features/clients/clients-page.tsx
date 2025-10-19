import { ClientsTable } from "@/components/features/clients/clients-table";
import { ClientsTableColumns } from "@/components/features/clients/clients-table-columns";
import { ClientIcon } from "@/components/icons";
import { getClients } from "@/queries/client";

export default async function ClientsPage({
  subdomain,
}: {
  subdomain: string;
}) {
  const clients = await getClients(subdomain);

  return (
    <div className="flex size-full flex-col rounded-lg bg-background">
      <div className="border-b p-3">
        <div className="flex items-center gap-1.5">
          <ClientIcon className="size-4 text-muted-foreground/75" />
          <h1 className="font-semibold text-xl tracking-tight">Clients</h1>
        </div>
      </div>
      <ClientsTable columns={ClientsTableColumns} data={clients} />
    </div>
  );
}
