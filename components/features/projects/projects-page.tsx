import { ProjectIcon } from "@/components/icons";

export default function ProjectsPage({ subdomain }: { subdomain: string }) {
  return (
    <div className="flex size-full flex-col rounded-lg bg-background">
      <div className="border-b p-3">
        <div className="flex items-center gap-1.5">
          <ProjectIcon className="size-4 text-muted-foreground/75" />
          <h1 className="font-semibold text-xl tracking-tight">Projects</h1>
        </div>
      </div>
    </div>
  );
}
