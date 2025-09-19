import { and, eq } from "drizzle-orm";
import Link from "next/link";
import CreateProjectForm from "@/components/forms/create-project-form";
import { db } from "@/db";
import { clients, organizations } from "@/db/schema";
import type { PROJECT_STATUSES } from "@/lib/constants";
import { extractDomain } from "@/lib/utils";

type Props = {
  params: Promise<{ organization: string }>;
  searchParams: Promise<{ defaultStatus?: string }>;
};

export default async function Page({ params, searchParams }: Props) {
  const { organization } = await params;
  const { defaultStatus } = await searchParams;
  const domain = extractDomain(organization);

  const data = await db
    .select({
      id: clients.id,
      status: clients.status,
      name: clients.name,
      image: clients.image,
      website: clients.website,
    })
    .from(clients)
    .innerJoin(organizations, eq(clients.organizationId, organizations.id))
    .where(and(eq(organizations.slug, domain), eq(clients.status, "active")));

  return (
    <div className="size-full rounded-lg bg-background">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 py-12">
        <Link
          className="text-muted-foreground transition-colors hover:text-foreground"
          href="/dashboard/projects"
        >
          <span className="text-sm">Back</span>
        </Link>
        <CreateProjectForm
          clients={data}
          defaultStatus={defaultStatus as (typeof PROJECT_STATUSES)[number]}
        />
      </div>
    </div>
  );
}
