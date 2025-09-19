import { eq } from "drizzle-orm";
import Link from "next/link";
import { clientColumns } from "@/components/tables/clients/columns";
import { ClientsTable } from "@/components/tables/clients/table";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { db } from "@/db";
import { clients, organizations } from "@/db/schema";
import { extractDomain } from "@/lib/utils";

type Props = {
  params: Promise<{ organization: string }>;
};

export default async function Page({ params }: Props) {
  const { organization } = await params;
  const domain = extractDomain(organization);

  const data = await db
    .select({
      id: clients.id,
      status: clients.status,
      name: clients.name,
      image: clients.image,
      website: clients.website,
    })
    .from(clients)
    .innerJoin(organizations, eq(clients.organizationId, organizations.id))
    .where(eq(organizations.slug, domain));

  return (
    <div className="flex size-full flex-col rounded-lg bg-background">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <h1 className="font-semibold text-2xl tracking-tight">Clients</h1>
          <Badge variant="secondary">{data.length}</Badge>
        </div>
        <Link
          className={buttonVariants({ variant: "default" })}
          href="/dashboard/clients/create"
        >
          Create client
        </Link>
      </div>
      <ClientsTable columns={clientColumns} data={data} />
    </div>
  );
}
