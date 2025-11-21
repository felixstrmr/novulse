"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ClientIcon,
  DashboardIcon,
  FileIcon,
  InboxIcon,
  ProjectIcon,
  SettingsIcon,
  TaskIcon,
} from "@/components/icons";
import { cn } from "@/utils/ui";

export default function DashboardSidebarNavigation() {
  const pathname = usePathname();

  const itemsTop = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: DashboardIcon,
      isActive: pathname === "/dashboard",
    },
    {
      name: "Inbox",
      href: "/dashboard/inbox",
      icon: InboxIcon,
      isActive: pathname.startsWith("/dashboard/inbox"),
    },
  ];

  const itemsMiddle = [
    {
      name: "Clients",
      href: "/dashboard/clients",
      icon: ClientIcon,
      isActive: pathname.startsWith("/dashboard/clients"),
    },
    {
      name: "Projects",
      href: "/dashboard/projects",
      icon: ProjectIcon,
      isActive: pathname.startsWith("/dashboard/projects"),
    },
    {
      name: "Tasks",
      href: "/dashboard/tasks",
      icon: TaskIcon,
      isActive: pathname.startsWith("/dashboard/tasks"),
    },
    {
      name: "Files",
      href: "/dashboard/files",
      icon: FileIcon,
      isActive: pathname.startsWith("/dashboard/files"),
    },
  ];

  const itemsBottom = [
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: SettingsIcon,
      isActive: pathname.startsWith("/dashboard/settings"),
    },
  ];

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex flex-col gap-3">
        <div className="space-y-1">
          {itemsTop.map((item) => (
            <NavigationItem key={item.href} {...item} />
          ))}
        </div>
        <div className="space-y-1">
          {itemsMiddle.map((item) => (
            <NavigationItem key={item.href} {...item} />
          ))}
        </div>
      </div>

      <div className="space-y-1">
        {itemsBottom.map((item) => (
          <NavigationItem key={item.href} {...item} />
        ))}
      </div>
    </div>
  );
}

function NavigationItem({
  href,
  icon: Icon,
  isActive,
}: {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  isActive: boolean;
}) {
  return (
    <Link
      className={cn(
        "flex size-8 items-center gap-2 rounded-md px-2",
        isActive
          ? "bg-muted text-foreground"
          : "text-muted-foreground hover:bg-muted"
      )}
      href={href}
    >
      <Icon className="size-4 shrink-0" />
    </Link>
  );
}
