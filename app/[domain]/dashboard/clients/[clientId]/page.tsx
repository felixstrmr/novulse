import { Suspense } from "react";
import ClientPage from "@/components/features/client/client-page";
import ClientPageSkeleton from "@/components/features/client/client-page-skeleton";

export default function Page({
  params,
}: {
  params: Promise<{ domain: string; clientId: string }>;
}) {
  return (
    <Suspense fallback={<ClientPageSkeleton />}>
      <ClientPage params={params} />
    </Suspense>
  );
}
