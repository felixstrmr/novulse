import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SettingsSidebar() {
  return (
    <aside className="flex min-w-64 max-w-64 flex-col gap-3 rounded-lg bg-background p-3">
      <div className="flex items-center gap-2">
        <Button size="icon" variant="ghost">
          <ArrowLeftIcon />
        </Button>
        <p className="font-semibold text-xl tracking-tight">Settings</p>
      </div>
    </aside>
  );
}
