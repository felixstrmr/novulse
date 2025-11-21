import ClientUsersPage from "@/components/features/client-users/client-users-page";

export default function Page({
  params,
}: {
  params: Promise<{ domain: string; clientId: string }>;
}) {
  return <ClientUsersPage params={params} />;
}
