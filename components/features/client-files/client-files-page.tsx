import { getClientFiles } from "@/queries/client-files";
import { getFileFolders } from "@/queries/file-folders";
import { getUniqueDomain } from "@/utils/domain";

export default async function ClientFilesPage({
  params,
}: {
  params: Promise<{ domain: string; clientId: string }>;
}) {
  const { domain, clientId } = await params;
  const uniqueDomain = getUniqueDomain(domain);

  const [files, folders] = await Promise.all([
    getClientFiles(uniqueDomain, clientId),
    getFileFolders(uniqueDomain),
  ]);

  return (
    <div className="mx-auto w-full max-w-6xl pt-3">
      <h1 className="font-semibold text-lg tracking-tight">Files</h1>
    </div>
  );
}
