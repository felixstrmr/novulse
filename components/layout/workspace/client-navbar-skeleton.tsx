import { Spinner } from "@/components/ui/spinner";

export default function ClientNavbarSkeleton() {
  return (
    <aside className="flex items-center justify-center p-3">
      <Spinner />
    </aside>
  );
}
