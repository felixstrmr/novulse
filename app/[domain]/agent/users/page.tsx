import { Suspense } from "react";
import UsersPageSkeleton from "@/components/skeletons/users-page-skeleton";
import Users from "@/components/users/users-page";

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
