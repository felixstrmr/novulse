import { FilesIcon } from "@/components/icons";

export default function Page() {
  return (
    <div className="flex size-full flex-col">
      <div className="flex items-center justify-between border-b p-3">
        <div className="flex items-center gap-2">
          <FilesIcon className="size-4 text-muted-foreground" />
          <h1 className="font-semibold text-2xl tracking-tight">Files</h1>
        </div>
      </div>
    </div>
  );
}
