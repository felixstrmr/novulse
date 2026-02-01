import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function Templates({
  params,
}: {
  params: Promise<{ organizationId: string }>;
}) {
  const { organizationId } = await params;

  return (
    <div className="flex size-full flex-col rounded-xl border border-border/75 bg-background p-3">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-2xl tracking-tight">Templates</h1>
        <Link
          className={buttonVariants({ variant: "default" })}
          href={`/${organizationId}/templates/create`}
        >
          Add Template
        </Link>
      </div>
    </div>
  );
}
