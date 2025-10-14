import { Table } from "@/app/[domain]/dashboard/clients/_components/table";
import { TableColumns } from "@/app/[domain]/dashboard/clients/_components/table-columns";
import { getClients } from "@/queries/clients";

export default async function Clients({ subdomain }: { subdomain: string }) {
  const clients = await getClients(subdomain);

  return (
    <div className="flex size-full flex-col">
      <div className="flex items-center border-b p-3">
        <div className="flex items-center gap-1.5">
          <h1 className="font-semibold text-2xl tracking-tight">Clients</h1>
          <div className="rounded-sm bg-muted px-1.5 py-0.5">
            <p className="text-xs">{clients.length}</p>
          </div>
        </div>
      </div>
      <Table columns={TableColumns} data={clients} />
    </div>
  );
}
