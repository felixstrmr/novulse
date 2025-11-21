import { notFound } from "next/navigation";
import ClientNavbarNavigation from "@/components/layout/workspace/client-navbar-navigation";
import { getClient } from "@/queries/client";
import { getUniqueDomain } from "@/utils/domain";

export default async function ClientNavbar({
  params,
}: {
  params: Promise<{ domain: string; clientId: string }>;
}) {
  const { domain, clientId } = await params;
  const uniqueDomain = getUniqueDomain(domain);

  const client = await getClient(uniqueDomain, clientId);

  if (!client) {
    notFound();
  }

  return (
    <nav className="mx-auto flex w-full max-w-6xl flex-col gap-6 pt-12">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-xl tracking-tight">{client.name}</h1>
      </div>
      <ClientNavbarNavigation clientId={client.id} />
    </nav>
  );
}
