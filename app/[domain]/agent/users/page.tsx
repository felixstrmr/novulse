import { Suspense } from "react";
import Users from "@/components/agent/users/users-page";
import UsersPageSkeleton from "@/components/skeletons/users-page-skeleton";

export default function UsersPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  return (
    <Suspense fallback={<UsersPageSkeleton />}>
      <Users params={params} />
    </Suspense>
  );
}
