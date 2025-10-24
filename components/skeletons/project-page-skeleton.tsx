import { Spinner } from "@/components/ui/spinner";

export default function ProjectPageSkeleton() {
  return (
    <div className="flex size-full items-center justify-center rounded-lg bg-background">
      <Spinner />
    </div>
  );
}
