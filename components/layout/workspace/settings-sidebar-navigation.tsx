"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SettingsIcon } from "@/components/icons";
import { cn } from "@/utils/ui";

export default function SettingsSidebarNavigation({
  isManager,
}: {
  isManager: boolean;
}) {
  const pathname = usePathname();

  const itemsPersonal = [
    {
      name: "General",
      href: "/dashboard/settings",
      icon: SettingsIcon,
      isActive: pathname === "/dashboard/settings",
    },
  ];

  const itemsAdmin = [
    {
      name: "Workspace",
      href: "/dashboard/settings/workspace",
      icon: SettingsIcon,
      isActive: pathname.startsWith("/dashboard/settings/workspace"),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-1">
        <div className="p-0.5 pl-2">
          <p className="text-muted-foreground text-xs">Personal</p>
        </div>
        {itemsPersonal.map((item) => (
          <NavigationItem key={item.href} {...item} />
        ))}
      </div>
      {isManager && (
        <div className="space-y-1">
          <div className="p-0.5 pl-2">
            <p className="text-muted-foreground text-xs">Admin</p>
          </div>
          {itemsAdmin.map((item) => (
            <NavigationItem key={item.href} {...item} />
          ))}
        </div>
      )}
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
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
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
