import { Suspense } from "react";
import Clients from "@/components/_pages/clients";
import ClientsSkeleton from "@/components/_pages/clients/skeleton";
import { getWorkspaceSubdomain } from "@/utils/workspace";

export default async function ClientsPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  const subdomain = getWorkspaceSubdomain(domain);

  return (
    <Suspense fallback={<ClientsSkeleton />}>
      <Clients subdomain={subdomain} />
    </Suspense>
  );
}
