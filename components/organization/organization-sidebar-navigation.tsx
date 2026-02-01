"use client";

import {
  BoxIcon,
  CogIcon,
  FileTextIcon,
  HomeIcon,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/ui";

export default function OrganizationSidebarNavigation({
  organizationId,
}: {
  organizationId: string;
}) {
  const pathname = usePathname();

  const itemsTop = [
    {
      name: "Dashboard",
      href: `/${organizationId}`,
      icon: HomeIcon,
      isActive: pathname === `/${organizationId}`,
    },
    {
      name: "Templates",
      href: `/${organizationId}/templates`,
      icon: BoxIcon,
      isActive: pathname.startsWith(`/${organizationId}/templates`),
    },
    {
      name: "Documents",
      href: `/${organizationId}/documents`,
      icon: FileTextIcon,
      isActive: pathname.startsWith(`/${organizationId}/documents`),
    },
  ];

  const itemsBottom = [
    {
      name: "Settings",
      href: `/${organizationId}/settings`,
      icon: CogIcon,
      isActive: pathname.startsWith(`/${organizationId}/settings`),
    },
  ];

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="space-y-1">
        {itemsTop.map((item) => (
          <NavigationItem key={item.name} {...item} />
        ))}
      </div>
      <div className="space-y-1">
        {itemsBottom.map((item) => (
          <NavigationItem key={item.name} {...item} />
        ))}
      </div>
    </div>
  );
}

function NavigationItem({
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
        isActive ? "bg-muted" : "hover:bg-muted"
      )}
      href={href}
    >
      <Icon className="size-4 text-muted-foreground" />
      <span className="text-sm">{name}</span>
    </Link>
  );
}
