import { Suspense } from "react";
import ClientNavbar from "@/components/layout/workspace/client-navbar";
import ClientNavbarSkeleton from "@/components/layout/workspace/client-navbar-skeleton";

export default function ClientLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ domain: string; clientId: string }>;
}) {
  return (
    <div className="flex size-full flex-col rounded-xl bg-background">
      <Suspense fallback={<ClientNavbarSkeleton />}>
        <ClientNavbar params={params} />
      </Suspense>
      {children}
    </div>
  );
}
