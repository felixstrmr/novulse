import { redirect } from "next/navigation";
import { getUser } from "@/queries/users/get-user";

export default async function AgentTopbar() {
  const user = await getUser();

  if (!user) {
    redirect("/signin");
  }

  return (
    <nav className="flex items-center justify-between border-b p-3">
      <p />
      <div className="size-8 rounded-full bg-muted" />
    </nav>
  );
}
