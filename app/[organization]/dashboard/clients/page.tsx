import Link from "next/link";
import { clientColumns } from "@/components/tables/clients/columns";
import { ClientsTable } from "@/components/tables/clients/table";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { extractDomain } from "@/lib/utils";
import { getClients } from "@/queries/clients";

type Props = {
  params: Promise<{ organization: string }>;
};

export default async function Page({ params }: Props) {
  const { organization } = await params;
  const domain = extractDomain(organization);

  const clients = await getClients(domain);

  return (
    <div className="flex size-full flex-col rounded-lg bg-background">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <h1 className="font-semibold text-2xl tracking-tight">Clients</h1>
          <Badge variant="secondary">{clients.length}</Badge>
        </div>
        <Link
          className={buttonVariants({ variant: "default" })}
          href="/dashboard/clients/create"
        >
          Create client
        </Link>
      </div>
      <ClientsTable clients={clients} columns={clientColumns} />
    </div>
  );
}
