import { ClientsTable } from "@/components/features/clients/clients-table";
import { ClientsTableColumns } from "@/components/features/clients/clients-table-columns";
import { ClientsIcon } from "@/components/icons";
import { getClients } from "@/queries/client";
import { getSubdomain } from "@/utils/domain";

export default async function ClientsPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  const subdomain = getSubdomain(domain);

  const clients = await getClients(subdomain);

  return (
    <div className="flex size-full flex-col">
      <div className="border-b p-3">
        <div className="flex items-center gap-1.5">
          <ClientsIcon className="size-4 text-muted-foreground" />
          <h1 className="font-semibold text-xl tracking-tight">Clients</h1>
        </div>
      </div>
      <ClientsTable columns={ClientsTableColumns} data={clients} />
    </div>
  );
}
