import { Spinner } from "@/components/ui/spinner";

export default function InboxSidebarSkeleton() {
  return (
    <aside className="flex min-w-96 max-w-96 items-center justify-center border-r p-3">
      <Spinner />
    </aside>
  );
}
