"use client";

import { HouseIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function DashboardHeaderBreadcrumb() {
  const pathname = usePathname();
  const items = pathname.split("/").filter(Boolean).slice(1);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link
              className="flex h-7 items-center rounded-md px-2 text-foreground hover:bg-muted"
              href="/dashboard"
            >
              <HouseIcon className="size-3.5" />
            </Link>
          </BreadcrumbLink>
          {items.map((item) => (
            <Fragment key={item}>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem
                className="flex h-7 items-center rounded-md px-2 text-foreground hover:bg-muted"
                key={item}
              >
                <BreadcrumbLink asChild>
                  <Link
                    className="capitalize"
                    href={`${pathname
                      .split("/")
                      .slice(0, items.indexOf(item) + 1)
                      .join("/")}`}
                  >
                    {item}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Fragment>
          ))}
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
