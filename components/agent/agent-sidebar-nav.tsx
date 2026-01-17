"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AssetIcon,
  DashboardIcon,
  SettingsIcon,
  TicketIcon,
  UserIcon,
} from "@/components/icons";
import { cn } from "@/utils/ui";

export default function AgentSidebarNav() {
  const pathname = usePathname();

  const itemsTop = [
    {
      name: "Dashboard",
      href: "/agent",
      icon: DashboardIcon,
      isActive: pathname === "/agent",
    },
    {
      name: "Tickets",
      href: "/agent/tickets",
      icon: TicketIcon,
      isActive: pathname.startsWith("/agent/tickets"),
    },
    {
      name: "Assets",
      href: "/agent/assets",
      icon: AssetIcon,
      isActive: pathname.startsWith("/agent/assets"),
    },
    {
      name: "Users",
      href: "/agent/users",
      icon: UserIcon,
      isActive: pathname.startsWith("/agent/users"),
    },
  ];

  const itemsBottom = [
    {
      name: "Settings",
      href: "/agent/settings",
      icon: SettingsIcon,
      isActive: pathname === "/agent/settings",
    },
  ];

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex flex-col gap-1">
        {itemsTop.map((item) => (
          <NavItem key={item.name} {...item} />
        ))}
      </div>
      <div className="flex flex-col gap-1">
        {itemsBottom.map((item) => (
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
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  isActive: boolean;
}) {
  return (
    <Link
      className={cn(
        "flex h-8 items-center gap-2 rounded-md px-2 transition-colors",
        isActive
          ? "bg-blue-500/10 text-blue-500"
          : "text-muted-foreground hover:bg-muted"
      )}
      href={href}
    >
      <Icon className="size-4" />
      <span className="text-sm">{name}</span>
    </Link>
  );
}
