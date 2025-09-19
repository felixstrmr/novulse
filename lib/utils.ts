import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { env } from "@/lib/env";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractDomain(hostname: string) {
  return hostname.replace(`.${env.NEXT_PUBLIC_ROOT_DOMAIN}`, "");
}
