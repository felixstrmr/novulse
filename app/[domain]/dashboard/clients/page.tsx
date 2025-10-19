import { Suspense } from "react";
import ClientsPage from "@/components/features/clients/clients-page";
import ClientsPageSkeleton from "@/components/skeletons/clients-page-skeleton";
import { getSubdomain } from "@/utils/domain";

export default async function Page({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  const subdomain = getSubdomain(domain);

  return (
    <Suspense fallback={<ClientsPageSkeleton />}>
      <ClientsPage subdomain={subdomain} />
    </Suspense>
  );
}
