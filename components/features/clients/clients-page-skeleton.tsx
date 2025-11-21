import { Spinner } from "@/components/ui/spinner";

export default function ClientsPageSkeleton() {
  return (
    <div className="flex size-full items-center justify-center rounded-xl bg-background">
      <Spinner />
    </div>
  );
}
