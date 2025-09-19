"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
  projectId: string;
};

export default function ProjectNavbar({ projectId }: Props) {
  const segment = useSelectedLayoutSegment();

  const items = [
    {
      name: "Activities",
      href: `/dashboard/projects/${projectId}`,
      isActive: segment === null,
    },
    {
      name: "Files",
      href: `/dashboard/projects/${projectId}/files`,
      isActive: segment === "files",
    },
  ];

  return (
    <nav className="flex gap-1 border-b">
      {items.map((item) => (
        <NavItem key={item.name} {...item} />
      ))}
    </nav>
  );
}

type NavItemProps = {
  name: string;
  href: string;
  isActive: boolean;
};

function NavItem(item: NavItemProps) {
  return (
    <div className="flex flex-col gap-1">
      <Link
        className={cn(
          "flex h-8 items-center rounded-md px-2 hover:bg-muted",
          item.isActive ? "text-foreground" : "text-muted-foreground"
        )}
        href={item.href}
      >
        <span className="text-sm">{item.name}</span>
      </Link>
      <div
        className={cn("h-px w-full rounded-md", item.isActive && "bg-primary")}
      />
    </div>
  );
}
