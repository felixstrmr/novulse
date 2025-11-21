import { ClientsTable } from "@/components/features/clients/clients-table";
import { ClientsTableColumns } from "@/components/features/clients/clients-table-columns";
import { getClients } from "@/queries/client";
import { getUniqueDomain } from "@/utils/domain";

export default async function ClientsPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  const uniqueDomain = getUniqueDomain(domain);

  const clients = await getClients(uniqueDomain);

  return (
    <div className="flex size-full flex-col rounded-xl bg-background">
      <div className="flex items-center justify-between border-b p-3">
        <h1 className="flex h-8 items-center font-semibold text-xl tracking-tight">
          Clients
        </h1>
      </div>
      <ClientsTable columns={ClientsTableColumns} data={clients} />
    </div>
  );
}
