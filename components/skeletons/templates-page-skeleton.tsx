import { Spinner } from "@/components/ui/spinner";

export default function TemplatesPageSkeleton() {
  return (
    <div className="flex size-full items-center justify-center rounded-xl border border-border/75 bg-background p-3">
      <Spinner />
    </div>
  );
}
