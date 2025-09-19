"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { ClientsIcon } from "@/components/icons/clients-icon";
import { DashboardIcon } from "@/components/icons/dashboard-icon";
import { FilesIcon } from "@/components/icons/files-icon";
import { NovulseIcon } from "@/components/icons/novulse-icon";
import { ProjectsIcon } from "@/components/icons/projects-icon";
import { SettingsIcon } from "@/components/icons/settings-icon";
import { TasksIcon } from "@/components/icons/tasks-icon";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export default function DashboardSidebar() {
  const segment = useSelectedLayoutSegment();

  const itemsTop = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: DashboardIcon,
      isActive: segment === null,
    },
    {
      name: "Clients",
      href: "/dashboard/clients",
      icon: ClientsIcon,
      isActive: segment === "clients",
    },
    {
      name: "Projects",
      href: "/dashboard/projects",
      icon: ProjectsIcon,
      isActive: segment === "projects",
    },
    {
      name: "Tasks",
      href: "/dashboard/tasks",
      icon: TasksIcon,
      isActive: segment === "tasks",
    },
    {
      name: "Files",
      href: "/dashboard/files",
      icon: FilesIcon,
      isActive: segment === "files",
    },
  ] as NavItemProps[];

  const itemsBottom = [
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: SettingsIcon,
      isActive: segment === "settings",
    },
  ] as NavItemProps[];

  return (
    <aside className="flex flex-col gap-4 rounded-lg bg-background p-4">
      <Link
        className={buttonVariants({ variant: "default", size: "icon" })}
        href="/dashboard"
      >
        <NovulseIcon className="size-4" />
      </Link>
      <div className="flex h-full flex-col items-center justify-between">
        <div className="space-y-1">
          {itemsTop.map((item) => (
            <NavItem key={item.name} {...item} />
          ))}
        </div>
        <div className="space-y-1">
          {itemsBottom.map((item) => (
            <NavItem key={item.name} {...item} />
          ))}
        </div>
      </div>
    </aside>
  );
}

type NavItemProps = {
  name: string;
  href: string;
  icon: React.ElementType;
  isActive: boolean;
};

function NavItem(item: NavItemProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          className={cn(
            "flex size-8 items-center justify-center rounded-md",
            item.isActive
              ? "bg-muted text-foreground"
              : "text-muted-foreground hover:bg-muted"
          )}
          href={item.href}
        >
          <item.icon className="size-4" />
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>{item.name}</p>
      </TooltipContent>
    </Tooltip>
  );
}
