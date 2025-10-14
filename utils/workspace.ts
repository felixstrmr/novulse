import { env } from "@/lib/env";

export function getWorkspaceSubdomain(domain: string) {
  return domain.replace(`.${env.NEXT_PUBLIC_ROOT_DOMAIN}`, "");
}

export function getWorkspaceUrl(domain: string) {
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

  if (domain.includes(".")) {
    return `${protocol}://${domain}`;
  }

  return `${protocol}://${domain}.${env.NEXT_PUBLIC_ROOT_DOMAIN}`;
}
