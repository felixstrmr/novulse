"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import {
  ClientIcon,
  DashboardIcon,
  FileIcon,
  InboxIcon,
  ProjectIcon,
  SettingIcon,
  TaskIcon,
} from "@/components/icons";
import { cn } from "@/utils/ui";

export default function DashboardSidebarNav() {
  const segment = useSelectedLayoutSegment();

  const itemsFirst = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: DashboardIcon,
      isActive: segment === null,
    },
    {
      name: "Inbox",
      href: "/dashboard/inbox",
      icon: InboxIcon,
      isActive: segment === "inbox",
    },
  ];

  const itemsSecond = [
    {
      name: "Clients",
      href: "/dashboard/clients",
      icon: ClientIcon,
      isActive: segment === "clients",
    },
    {
      name: "Projects",
      href: "/dashboard/projects",
      icon: ProjectIcon,
      isActive: segment === "projects",
    },
    {
      name: "Tasks",
      href: "/dashboard/tasks",
      icon: TaskIcon,
      isActive: segment === "tasks",
    },
    {
      name: "Files",
      href: "/dashboard/files",
      icon: FileIcon,
      isActive: segment === "files",
    },
  ];

  const itemsThird = [
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: SettingIcon,
      isActive: segment === "settings",
    },
  ];

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="space-y-3">
        <div className="space-y-0.5">
          {itemsFirst.map((item) => (
            <NavItem key={item.href} {...item} />
          ))}
        </div>
        <div className="space-y-0.5">
          {itemsSecond.map((item) => (
            <NavItem key={item.href} {...item} />
          ))}
        </div>
      </div>
      <div className="space-y-0.5">
        {itemsThird.map((item) => (
          <NavItem key={item.href} {...item} />
        ))}
      </div>
    </div>
  );
}

function NavItem({
  name,
  href,
  icon: Icon,
  isActive,
}: {
  name: string;
  href: string;
  icon: React.ElementType;
  isActive: boolean;
}) {
  return (
    <Link
      className={cn(
        "flex h-8 items-center gap-2 rounded-md px-2",
        isActive
          ? "bg-muted text-primary"
          : "text-muted-foreground hover:bg-muted"
      )}
      href={href}
    >
      <Icon className="size-4 shrink-0 text-muted-foreground/75" />
      <span className="text-sm">{name}</span>
    </Link>
  );
}
