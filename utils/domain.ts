import { env } from "@/lib/env";

export function getUniqueDomain(domain: string) {
  return domain.replace(`.${env.NEXT_PUBLIC_ROOT_DOMAIN}`, "");
}

export function getSlugFromName(name: string) {
  return name.toLowerCase().replace(/ /g, "-");
}

export function urlProofSlug(slug: string): string {
  return slug
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters except word chars, spaces, and hyphens
    .replace(/[\s_]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/-+/g, "-") // Collapse multiple consecutive hyphens
    .replace(/^-+|-+$/g, "") // Remove leading and trailing hyphens
    .slice(0, 255); // Limit length
}
