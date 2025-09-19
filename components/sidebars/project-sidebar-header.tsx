import { ProjectIcon } from "@/components/icons/project-icon";
import type { Project } from "@/types";

type Props = {
  project: Project;
};

export default function ProjectSidebarHeader({ project }: Props) {
  return (
    <div className="flex items-center gap-2 border-b p-4">
      <div className="flex h-8 items-center justify-center">
        <ProjectIcon className="size-4 text-muted-foreground" />
      </div>
      <h1 className="font-semibold text-2xl tracking-tight">{project.name}</h1>
    </div>
  );
}
