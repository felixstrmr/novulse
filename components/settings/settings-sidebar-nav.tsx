"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SettingsIcon, WorkspaceIcon } from "@/components/icons";
import { cn } from "@/utils/ui";

export default function SettingsSidebarNav() {
  const pathname = usePathname();

  const itemsPersonal = [
    {
      name: "General",
      href: "/agent/settings",
      icon: SettingsIcon,
      isActive: pathname === "/agent/settings",
    },
  ];

  const itemsWorkspace = [
    {
      name: "Workspace",
      href: "/agent/settings/workspace",
      icon: WorkspaceIcon,
      isActive: pathname === "/agent/settings/workspace",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <p className="text-muted-foreground text-xs">Personal</p>
        {itemsPersonal.map((item) => (
          <NavItem key={item.name} {...item} />
        ))}
      </div>
      <div className="flex flex-col gap-1.5">
        <p className="text-muted-foreground text-xs">Workspace</p>
        {itemsWorkspace.map((item) => (
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
