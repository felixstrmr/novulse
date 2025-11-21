import { env } from "@/lib/env";

export function getUniqueDomain(domain: string) {
  return domain.replace(`.${env.NEXT_PUBLIC_ROOT_DOMAIN}`, "");
}
