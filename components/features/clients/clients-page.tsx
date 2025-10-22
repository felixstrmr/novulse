import { UserIcon } from "lucide-react";
import { ClientsTable } from "@/components/features/clients/clients-table";
import { ClientsTableColumns } from "@/components/features/clients/clients-table-columns";
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
    <div className="flex size-full flex-col rounded-lg bg-background">
      <div className="border-b p-3">
        <div className="flex items-center gap-1.5">
          <UserIcon className="size-4 text-muted-foreground" />
          <h1 className="font-semibold text-xl tracking-tight">Clients</h1>
        </div>
      </div>
      <ClientsTable columns={ClientsTableColumns} data={clients} />
    </div>
  );
}
