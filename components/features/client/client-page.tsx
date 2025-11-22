import { getUniqueDomain } from "@/utils/domain";

export default async function ClientPage({
  params,
}: {
  params: Promise<{ domain: string; clientId: string }>;
}) {
  const { domain, clientId } = await params;
  const uniqueDomain = getUniqueDomain(domain);

  return <div className="flex size-full rounded-xl bg-background" />;
}
