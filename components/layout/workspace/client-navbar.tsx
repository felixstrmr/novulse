import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Avatar from "@/components/common/avatar";
import ClientStatusBadge from "@/components/common/client-status-badge";
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
      <Link
        className="flex items-center gap-1 text-muted-foreground text-sm hover:text-foreground"
        href="/dashboard/clients"
      >
        <ArrowLeftIcon className="size-3.5" />
        Clients
      </Link>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar value={client.name} />
          <h1 className="font-semibold text-xl tracking-tight">
            {client.name}
          </h1>
          <ClientStatusBadge isActive={client.is_active} />
        </div>
      </div>
      <ClientNavbarNavigation clientId={client.id} />
    </nav>
  );
}
