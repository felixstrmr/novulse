"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/ui";

export default function ClientNavbarNavigation({
  clientId,
}: {
  clientId: string;
}) {
  const pathname = usePathname();

  const items = [
    {
      name: "Overview",
      href: `/dashboard/clients/${clientId}`,
      isActive: pathname === `/dashboard/clients/${clientId}`,
    },
    {
      name: "Users",
      href: `/dashboard/clients/${clientId}/users`,
      isActive: pathname === `/dashboard/clients/${clientId}/users`,
    },
    {
      name: "Files",
      href: `/dashboard/clients/${clientId}/files`,
      isActive: pathname === `/dashboard/clients/${clientId}/files`,
    },
  ];

  return (
    <div className="flex items-center gap-1 border-b">
      {items.map((item) => (
        <NavigationItem key={item.href} {...item} />
      ))}
    </div>
  );
}

function NavigationItem({
  name,
  href,
  isActive,
}: {
  name: string;
  href: string;
  isActive: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <Link
        className={cn(
          "flex h-7 items-center justify-center rounded-md px-2 hover:bg-muted",
          isActive ? "text-foreground" : "text-muted-foreground"
        )}
        href={href}
      >
        <span className="text-sm">{name}</span>
      </Link>
      <div
        className={cn(
          "h-px w-full",
          isActive ? "bg-primary" : "bg-transparent"
        )}
      />
    </div>
  );
}
