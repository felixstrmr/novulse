import { env } from "@/lib/env";

export function getWorkspaceSubdomain(domain: string) {
  return domain.replace(`.${env.NEXT_PUBLIC_ROOT_DOMAIN}`, "");
}

export function getWorkspaceUrl(subdomain: string) {
  const protocol = env.NODE_ENV === "production" ? "https" : "http";

  return `${protocol}://${subdomain}.${env.NEXT_PUBLIC_ROOT_DOMAIN}/dashboard`;
}
