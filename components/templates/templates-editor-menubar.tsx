import { RedoIcon, UndoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function TemplatesEditorMenubar() {
  return (
    <div className="absolute right-0 bottom-4 left-0 mx-auto flex w-fit items-center gap-2 rounded-xl bg-background p-2 shadow-md">
      <div className="flex items-center gap-1">
        <Button size="icon-sm" variant="ghost">
          <UndoIcon />
        </Button>
        <Button size="icon-sm" variant="ghost">
          <RedoIcon />
        </Button>
      </div>
      <Separator className="max-h-4 min-h-4" orientation="vertical" />
      <div className="flex items-center gap-2">
        <Button size="sm">Publish</Button>
      </div>
    </div>
  );
}
