import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import SettingsSidebarNav from "@/components/settings/settings-sidebar-nav";
import { buttonVariants } from "@/components/ui/button";

export default function SettingsSidebar() {
  return (
    <div className="flex min-w-64 max-w-64 flex-col gap-3 border-r bg-[#0E0E0F] p-3">
      <div className="flex items-center gap-2">
        <Link
          className={buttonVariants({ variant: "ghost", size: "icon" })}
          href="/agent"
        >
          <ArrowLeftIcon />
        </Link>
        <h1 className="font-semibold text-2xl tracking-tight">Settings</h1>
      </div>
      <SettingsSidebarNav />
    </div>
  );
}
