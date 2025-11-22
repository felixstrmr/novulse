import { Suspense } from "react";
import SettingsStatusesPage from "@/components/features/settings-statuses/settings-statuses-page";
import SettingsStatusesSkeleton from "@/components/features/settings-statuses/settings-statuses-skeleton";

export default function Page({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  return (
    <Suspense fallback={<SettingsStatusesSkeleton />}>
      <SettingsStatusesPage params={params} />
    </Suspense>
  );
}
