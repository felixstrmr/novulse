import { Spinner } from "@/components/ui/spinner";

export default function SettingsSidebarSkeleton() {
  return (
    <aside className="flex min-w-64 max-w-64 items-center justify-center rounded-lg border-r bg-background">
      <Spinner />
    </aside>
  );
}
