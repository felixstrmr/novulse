import { Suspense } from "react";
import ClientsView from "@/components/clients/clients-view";
import ClientsViewSkeleton from "@/components/skeletons/clients-view-skeleton";
import { Button } from "@/components/ui/button";
import { getWorkspaceSubdomain } from "@/utils/workspace";

export default async function ClientsPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  const subdomain = getWorkspaceSubdomain(domain);

  return (
    <div className="flex size-full flex-col rounded-lg bg-background">
      <div className="flex items-center justify-between border-b p-3">
        <h1 className="font-semibold text-2xl tracking-tight">Clients</h1>
        <Button>Add client</Button>
      </div>
      <Suspense fallback={<ClientsViewSkeleton />}>
        <ClientsView subdomain={subdomain} />
      </Suspense>
    </div>
  );
}
