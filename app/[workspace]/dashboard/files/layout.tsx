import { FilesIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

export default function FilesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex size-full flex-col">
      <div className="flex items-center justify-between border-b p-3">
        <div className="flex items-center gap-2">
          <FilesIcon className="size-4 text-muted-foreground" />
          <h1 className="font-semibold text-2xl tracking-tight">Files</h1>
        </div>
        <Button>Upload file</Button>
      </div>
      <div className="border-b bg-muted/50 p-3">
        <p className="text-muted-foreground text-sm">Name</p>
      </div>
      {children}
    </div>
  );
}
