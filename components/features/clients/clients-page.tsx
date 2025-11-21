import ClientsPageHeader from "@/components/features/clients/clients-page-header";
import { ClientsTable } from "@/components/features/clients/clients-table";
import { ClientsTableColumns } from "@/components/features/clients/clients-table-columns";
import { ClientIcon } from "@/components/icons";
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
        <div className="flex items-center gap-2">
          <ClientIcon className="size-4 text-muted-foreground" />
          <h1 className="flex h-8 items-center font-semibold text-xl tracking-tight">
            Clients
          </h1>
        </div>
      </div>
      <div className="flex w-full flex-col gap-3 p-3">
        <ClientsPageHeader clients={clients} />
        <ClientsTable columns={ClientsTableColumns} data={clients} />
      </div>
    </div>
  );
}
