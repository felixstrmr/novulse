import { Suspense } from "react";
import Clients from "@/app/[domain]/dashboard/clients/_components/main";
import ClientsSkeleton from "@/app/[domain]/dashboard/clients/_components/skeleton";
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
