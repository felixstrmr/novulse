import { ClientsTable } from "@/components/workspace/clients/clients-table";
import { clientsTableColumns } from "@/components/workspace/clients/clients-table-columns";
import { getClients } from "@/queries/clients";

export default async function ClientsView({ domain }: { domain: string }) {
  const clients = await getClients(domain);

  return <ClientsTable columns={clientsTableColumns} data={clients} />;
}
