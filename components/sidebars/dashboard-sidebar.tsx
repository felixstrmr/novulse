"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { ClientsIcon } from "@/components/icons/clients-icon";
import { DashboardIcon } from "@/components/icons/dashboard-icon";
import { FilesIcon } from "@/components/icons/files-icon";
import { NovulseIcon } from "@/components/icons/novulse-icon";
import { ProjectsIcon } from "@/components/icons/projects-icon";
import { SettingsIcon } from "@/components/icons/settings-icon";
import { buttonVariants } from "@/components/ui/button";
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
        <NovulseIcon />
      </Link>
      <div className="flex h-full flex-col justify-between">
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
    <Link
      className={cn(
        "flex size-8 items-center gap-2 rounded-md px-2",
        item.isActive
          ? "bg-muted text-foreground"
          : "text-muted-foreground hover:bg-muted"
      )}
      href={item.href}
    >
      <item.icon className="size-4" />
    </Link>
  );
}
