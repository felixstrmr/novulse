import { env } from "@/lib/env";

export function getWorkspaceSubdomain(domain: string) {
  return domain.replace(`.${env.NEXT_PUBLIC_ROOT_DOMAIN}`, "");
}
