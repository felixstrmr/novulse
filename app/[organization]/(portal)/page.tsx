import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { members, organizations } from "@/db/schema";
import { extractDomain } from "@/lib/utils";
import { getSession } from "@/queries/sessions";

type Props = {
  params: Promise<{ organization: string }>;
};

export default async function Page({ params }: Props) {
  const { organization } = await params;
  const domain = extractDomain(organization);

  const session = await getSession();

  if (!session) {
    redirect("/signin");
  }

  const member = await db
    .select()
    .from(members)
    .innerJoin(organizations, eq(members.organizationId, organizations.id))
    .where(
      and(eq(organizations.slug, domain), eq(members.userId, session.user.id))
    );

  redirect("/dashboard");

  return (
    <div>
      <pre>{JSON.stringify(member, null, 2)}</pre>
    </div>
  );
}
