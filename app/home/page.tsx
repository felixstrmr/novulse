import { Badge } from "@/components/ui/badge";

export default function Page() {
  return (
    <div className="pt-32">
      <section className="flex items-center justify-center">
        <div className="mx-auto w-full max-w-6xl">
          <Badge
            className="motion-opacity-in-0 motion-translate-y-in-100 motion-blur-in-xs gap-1.5 py-3 text-base"
            variant="secondary"
          >
            <div className="size-2 rounded-full bg-green-500" />
            Currenly in beta
          </Badge>
          <h1 className="motion-opacity-in-0 motion-translate-y-in-100 motion-blur-in-xs mt-6 font-semibold text-7xl leading-tight tracking-tight">
            Open Source{" "}
            <span className="ml-1 rounded-md bg-blue-500/10 px-3 py-1 text-blue-500">
              ITSM & ITAM
            </span>{" "}
            <br />
            without Enterprise Complexity
          </h1>
          <p className="motion-opacity-in-0 motion-translate-y-in-100 motion-blur-in-xs motion-delay-200 mt-4 max-w-xl text-muted-foreground text-xl">
            Finally, a service desk solution developed in the open by people
            who actually use it every day. ITIL compliance without corporate
            overhead.
          </p>
        </div>
      </section>
    </div>
  );
}
