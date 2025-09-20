import Link from "next/link";
import { redirect } from "next/navigation";
import Avatar from "@/components/avatar";
import DashboardHeaderBreadcrumb from "@/components/headers/dashboard-header-breadcrumb";
import { NotificationIcon } from "@/components/icons/notification-icon";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getSession } from "@/queries/sessions";

export default async function DashboardHeader() {
  const session = await getSession();

  if (!session) {
    redirect("/signin");
  }

  return (
    <div className="flex items-center justify-between rounded-lg bg-background px-4 py-2">
      <DashboardHeaderBreadcrumb />
      <div className="flex items-center gap-2">
        <Link
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "text-xs"
          )}
          href="https://novulse.userjot.com"
          passHref
          target="_blank"
        >
          Feedback
        </Link>
        <div className="flex size-7 items-center justify-center rounded-md border">
          <NotificationIcon className="size-3.5" />
        </div>
        <Avatar
          image={session.user.image}
          size="sm"
          value={session.user.name}
        />
      </div>
    </div>
  );
}
