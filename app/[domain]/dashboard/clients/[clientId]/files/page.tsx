import { Suspense } from "react";
import ClientFilesPage from "@/components/features/client-files/client-files-page";
import ClientFilesSkeleton from "@/components/features/client-files/client-files-skeleton";

export default function Page({
  params,
}: {
  params: Promise<{ domain: string; clientId: string }>;
}) {
  return (
    <Suspense fallback={<ClientFilesSkeleton />}>
      <ClientFilesPage params={params} />
    </Suspense>
  );
}
