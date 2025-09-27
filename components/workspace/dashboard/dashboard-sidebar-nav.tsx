"use client";

import {
  Box,
  CogIcon,
  FilesIcon,
  HomeIcon,
  InboxIcon,
  ListTodo,
  type LucideIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { cn } from "@/utils";

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
      icon: Box,
      isActive: segment === "projects",
    },
    {
      name: "Tasks",
      href: "/dashboard/tasks",
      icon: ListTodo,
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
      icon: CogIcon,
      isActive: segment === "settings",
    },
  ];

  return (
    <div className="flex size-full flex-col justify-between">
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
        "flex h-8 items-center gap-2 rounded-md px-2",
        isActive
          ? "bg-muted text-foreground"
          : "text-muted-foreground hover:bg-muted"
      )}
      href={href}
    >
      <Icon className="size-4" />
      <span className="text-sm">{name}</span>
    </Link>
  );
}
