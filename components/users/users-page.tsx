import { getSubdomain } from "@/utils/domain";

export default async function UsersPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  const subdomain = getSubdomain(domain);

  return <div>Users</div>;
}
