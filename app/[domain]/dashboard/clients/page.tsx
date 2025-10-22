import { Suspense } from "react";
import ClientsPage from "@/components/features/clients/clients-page";
import ClientsPageSkeleton from "@/components/skeletons/clients-page-skeleton";

export default function Page({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  return (
    <Suspense fallback={<ClientsPageSkeleton />}>
      <ClientsPage params={params} />
    </Suspense>
  );
}
