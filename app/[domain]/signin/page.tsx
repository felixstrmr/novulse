import SigninForm from "@/components/forms/signin-form";
import { NovulseIcon } from "@/components/icons";

export default function Page() {
  return (
    <div className="flex size-full items-center justify-center bg-muted/50">
      <div className="rounded-xl bg-background p-8 shadow-md">
        <div className="flex size-8 items-center justify-center rounded-md bg-muted text-foreground">
          <NovulseIcon className="size-4" />
        </div>
        <div className="mt-4 mb-8">
          <h1 className="font-semibold text-2xl tracking-tight">
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
