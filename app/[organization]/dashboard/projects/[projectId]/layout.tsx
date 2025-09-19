import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import ProjectNavbar from "@/components/navbars/project-navbar";
import ProjectHeaderSkeleton from "@/components/skeletons/project-header-skeleton";
import ProjectHeader from "@/components/views/project/project-header";
import { extractDomain } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  params: Promise<{ organization: string; projectId: string }>;
};

export default async function ProjectLayout({ children, params }: Props) {
  const { organization, projectId } = await params;
  const domain = extractDomain(organization);

  return (
    <div className="relative size-full rounded-lg bg-background">
      <Link
        className="absolute top-4 left-4 flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
        href="/dashboard/projects"
      >
        <ChevronLeftIcon className="size-3.5" />
        <span className="text-sm">Back</span>
      </Link>
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 py-12">
        <Suspense fallback={<ProjectHeaderSkeleton />}>
          <ProjectHeader domain={domain} projectId={projectId} />
        </Suspense>
        <div className="space-y-4">
          <ProjectNavbar projectId={projectId} />
          {children}
        </div>
      </div>
    </div>
  );
}
