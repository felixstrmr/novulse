import Link from "next/link";
import { FolderIcon } from "@/components/icons/folder-icon";
import { getRootFileFolders } from "@/queries/file-folder";
import { getFilesByFolderId } from "@/queries/files";
import { extractDomain } from "@/utils";

export default async function Page({
  params,
}: {
  params: Promise<{ workspace: string; all: string[] }>;
}) {
  const { workspace, all } = await params;
  const domain = extractDomain(workspace);

  if (all === undefined) {
    const rootFileFolders = await getRootFileFolders(domain);

    return (
      <div className="flex size-full flex-col">
        {rootFileFolders.map((fileFolder) => (
          <Link
            className="flex items-center gap-2 border-t p-3 first:border-t-0 hover:bg-muted"
            href={`/dashboard/files/${fileFolder.id}`}
            key={fileFolder.id}
          >
            <FolderIcon className="size-4 text-[#82828B]" />
            <span className="text-sm">{fileFolder.name}</span>
          </Link>
        ))}
      </div>
    );
  }

  const files = await getFilesByFolderId(domain, all[0]);

  return (
    <div className="flex size-full flex-col">
      {files.map((file) => (
        <div key={file.id}>{file.name}</div>
      ))}
    </div>
  );
}
