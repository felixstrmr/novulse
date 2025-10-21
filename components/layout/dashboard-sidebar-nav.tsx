"use client";

import {
  BoxIcon,
  CogIcon,
  FileIcon,
  HouseIcon,
  InboxIcon,
  ListTodoIcon,
  type LucideIcon,
  UserIcon,
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
      icon: HouseIcon,
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
      icon: UserIcon,
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
      icon: FileIcon,
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
      <Icon className="size-4 shrink-0" />
      <span className="text-sm">{name}</span>
    </Link>
  );
}
