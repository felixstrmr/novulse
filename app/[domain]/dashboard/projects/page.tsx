import { Suspense } from "react";
import Clients from "@/components/pages/clients";
import ClientsSkeleton from "@/components/skeletons/clients-skeleton";

export default function ClientsPage() {
  return (
    <Suspense fallback={<ClientsSkeleton />}>
      <Clients />
    </Suspense>
  );
}
