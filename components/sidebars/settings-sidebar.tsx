"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { OrganizationSettingsIcon } from "@/components/icons/organization-settings-icon";
import { ProfileSettingsIcon } from "@/components/icons/profile-settings-icon";
import { cn } from "@/lib/utils";

export default function SettingsSidebar() {
  const segment = useSelectedLayoutSegment();

  const itemsPersonal = [
    {
      name: "Profile",
      href: "/dashboard/settings",
      icon: ProfileSettingsIcon,
      isActive: segment === null,
    },
  ] as NavItemProps[];

  const itemsOrganization = [
    {
      name: "Organization",
      href: "/dashboard/settings/organization",
      icon: OrganizationSettingsIcon,
      isActive: segment === "organization",
    },
  ] as NavItemProps[];

  return (
    <aside className="flex w-64 min-w-64 max-w-64 flex-col rounded-lg bg-background">
      <div className="flex items-center gap-2 border-b p-4">
        <h1 className="flex h-8 items-center font-semibold text-2xl tracking-tight">
          Settings
        </h1>
      </div>
      <div className="space-y-2 p-4">
        <p className="text-muted-foreground text-xs">Personal</p>
        <div className="space-y-1">
          {itemsPersonal.map((item) => (
            <NavItem key={item.name} {...item} />
          ))}
        </div>
      </div>
      <div className="space-y-2 p-4">
        <p className="text-muted-foreground text-xs">Organization</p>
        <div className="space-y-1">
          {itemsOrganization.map((item) => (
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
        "flex h-8 items-center gap-2 rounded-md px-2",
        item.isActive
          ? "bg-muted text-foreground"
          : "text-muted-foreground hover:bg-muted"
      )}
      href={item.href}
    >
      <item.icon className="size-4" />
      <span className="text-sm">{item.name}</span>
    </Link>
  );
}
