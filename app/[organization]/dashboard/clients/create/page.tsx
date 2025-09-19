import Link from "next/link";
import CreateClientForm from "@/components/forms/create-client-form";

export default function Page() {
  return (
    <div className="size-full rounded-lg bg-background">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 py-12">
        <Link
          className="text-muted-foreground transition-colors hover:text-foreground"
          href="/dashboard/clients"
        >
          <span className="text-sm">Back</span>
        </Link>
        <CreateClientForm />
      </div>
    </div>
  );
}
