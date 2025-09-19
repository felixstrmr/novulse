import { db } from "@/db";
import { clients } from "@/db/schema";

export default async function Page() {
  const data = await db.select().from(clients);

  return <div>files</div>;
}
