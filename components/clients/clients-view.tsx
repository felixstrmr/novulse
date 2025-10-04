import { ClientsTable } from "@/components/clients/clients-table";
import { clientsTableColumns } from "@/components/clients/clients-table-columns";
import { getClients } from "@/queries/clients";

export default async function ClientsView({
  subdomain,
}: {
  subdomain: string;
}) {
  const clients = await getClients(subdomain);

  return (
    <div>
      <ClientsTable columns={clientsTableColumns} data={clients} />
    </div>
  );
}
