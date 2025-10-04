"use client";

import {
  BoxIcon,
  FilesIcon,
  HomeIcon,
  InboxIcon,
  ListTodoIcon,
  type LucideIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { cn } from "@/utils/ui";

export default function DashboardSidebarNav() {
  const segment = useSelectedLayoutSegment();

  const itemsFirst = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: HomeIcon,
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
      icon: UsersIcon,
      isActive: segment === "clients",
    },
    {
      name: "Projects",
      href: "/dashboard/projects",
      icon: BoxIcon,
      isActive: segment === "projects",
    },
    {
      name: "Tasks",
      href: "/dashboard/tasks",
      icon: ListTodoIcon,
      isActive: segment === "tasks",
    },
    {
      name: "Files",
      href: "/dashboard/files",
      icon: FilesIcon,
      isActive: segment === "files",
    },
  ];

  const itemsThird = [
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: SettingsIcon,
      isActive: segment === "settings",
    },
  ];

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="space-y-3">
        <div className="space-y-1">
          {itemsFirst.map((item) => (
            <NavItem key={item.name} {...item} />
          ))}
        </div>
        <div className="space-y-1">
          {itemsSecond.map((item) => (
            <NavItem key={item.name} {...item} />
          ))}
        </div>
      </div>
      <div className="space-y-1">
        {itemsThird.map((item) => (
          <NavItem key={item.name} {...item} />
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
  icon: LucideIcon;
  isActive: boolean;
}) {
  return (
    <Link
      className={cn(
        "flex h-8 items-center gap-2 rounded-md px-2 hover:bg-muted",
        isActive && "bg-muted"
      )}
      href={href}
    >
      <Icon className="size-4 shrink-0 text-muted-foreground" />
      <span className="text-sm">{name}</span>
    </Link>
  );
}
