"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { DashboardIcon } from "@/components/icons/dashboard-icon";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function DashboardHeaderBradcrumb() {
  const pathname = usePathname();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            className="text-muted-foreground hover:text-foreground"
            href="/dashboard"
          >
            <DashboardIcon className="size-3.5" />
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathname
          .split("/")
          .slice(2)
          .map((segment, index) => (
            <React.Fragment key={segment}>
              {index > -1 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="text-xs capitalize"
                  href={`/dashboard/${segment}`}
                >
                  {segment}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
