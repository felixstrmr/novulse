import type { Metadata } from "next/types";
import { Suspense } from "react";
import ClientsPage from "@/components/features/clients/clients-page";
import ClientsPageSkeleton from "@/components/features/clients/clients-page-skeleton";

export const metadata: Metadata = {
  title: "Novulse • Clients",
};

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
