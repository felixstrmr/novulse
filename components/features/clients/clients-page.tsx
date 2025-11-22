import AddClientDialog from "@/components/dialogs/add-client-dialog";
import ClientsPageHeader from "@/components/features/clients/clients-page-header";
import ClientsTable from "@/components/features/clients/clients-table";
import { ClientIcon } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { getClients } from "@/queries/clients";
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
      <div className="flex w-full flex-col gap-6 p-3">
        <ClientsPageHeader clients={clients} />
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Input className="min-w-64 max-w-64" placeholder="Search..." />
            <AddClientDialog />
          </div>
          <ClientsTable clients={clients} />
        </div>
      </div>
    </div>
  );
}
