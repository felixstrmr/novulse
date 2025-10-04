import { SidebarCloseIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function DashboardHeader() {
  return (
    <div className="flex items-center justify-between rounded-lg bg-background p-3">
      <div className="flex items-center gap-2">
        <Button size="iconSm" variant="ghost">
          <SidebarCloseIcon />
        </Button>
        <Separator className="h-3.5 max-h-3 min-h-3.5" orientation="vertical" />
      </div>
      <p className="h-6" />
    </div>
  );
}
