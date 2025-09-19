"use client";

import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { OrganizationSettingsIcon } from "@/components/icons/organization-settings-icon";
import { ProfileSettingsIcon } from "@/components/icons/profile-settings-icon";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function SettingsSidebar() {
  const router = useRouter();

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
      <div className="group flex items-center gap-2 border-b p-4">
        <button
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "-translate-x-4 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
          )}
          onClick={() => router.back()}
          type="button"
        >
          <ArrowLeftIcon className="size-4" />
        </button>
        <h1 className="-translate-x-8 flex h-8 items-center font-semibold text-2xl tracking-tight transition-transform group-hover:translate-x-0">
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
