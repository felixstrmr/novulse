import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { env } from "@/lib/env";

export const protocol = env.NODE_ENV === "development" ? "http" : "https";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractDomain(workspace: string) {
  return workspace.replace(`.${env.NEXT_PUBLIC_ROOT_DOMAIN}`, "");
}

export function getFullWorkspaceUrl(domain: string) {
  return `${protocol}://${domain.includes(".") ? domain : `${domain}.${env.NEXT_PUBLIC_ROOT_DOMAIN}`}/dashboard`;
}
