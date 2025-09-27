import { BoxIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { buttonVariants } from "@/components/ui/button";
import ProjectsView from "@/components/workspace/projects/projects-view";
import { extractDomain } from "@/utils";

export default async function Page({
  params,
}: {
  params: Promise<{ workspace: string }>;
}) {
  const { workspace } = await params;
  const domain = extractDomain(workspace);

  return (
    <div className="flex size-full flex-col">
      <div className="flex items-center justify-between border-b p-3">
        <div className="flex items-center gap-2">
          <BoxIcon className="size-4 text-muted-foreground" />
          <h1 className="font-semibold text-2xl tracking-tight">Projects</h1>
        </div>
        <Link
          className={buttonVariants({ variant: "default" })}
          href="/dashboard/projects/create"
        >
          Create project
        </Link>
      </div>

      <div className="flex size-full flex-col p-3">
        <Suspense
          fallback={
            <div className="flex size-full items-center justify-center">
              <Loader2 className="size-4 animate-spin" />
            </div>
          }
        >
          <ProjectsView domain={domain} />
        </Suspense>
      </div>
    </div>
  );
}
