import type { Metadata } from "next";
import { Suspense } from "react";
import ProjectsPage from "@/components/features/projects/projects-page";
import ProjectsPageSkeleton from "@/components/features/projects/projects-page-skeleton";

export const metadata: Metadata = {
  title: "Novulse • Projects",
};

export default function Page({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  return (
    <Suspense fallback={<ProjectsPageSkeleton />}>
      <ProjectsPage params={params} />
    </Suspense>
  );
}
