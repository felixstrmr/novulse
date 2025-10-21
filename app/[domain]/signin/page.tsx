import SigninForm from "@/components/forms/signin-form";
import { NovulseIcon } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="flex size-full items-center justify-center bg-muted/10">
      <div className="rounded-xl border bg-background p-8 shadow-lg">
        <div className={buttonVariants({ variant: "secondary", size: "icon" })}>
          <NovulseIcon />
        </div>
        <div className="mt-4 mb-8 space-y-0.5">
          <h1 className="font-semibold text-xl tracking-tight">
            Welcome back!
          </h1>
          <p className="text-muted-foreground text-sm">
            Enter your details to continue.
          </p>
        </div>
        <SigninForm redirectTo="/dashboard" />
      </div>
    </div>
  );
}
