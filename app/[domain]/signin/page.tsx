import SigninForm from "@/components/forms/signin-form";
import { NovulseIcon } from "@/components/icons";

export default function Page() {
  return (
    <div className="flex size-full items-center justify-center">
      <div>
        <div className="flex size-8 items-center justify-center rounded-md bg-primary">
          <NovulseIcon className="size-4 text-primary-foreground" />
        </div>
        <div className="mt-3 mb-6">
          <h1 className="font-semibold text-xl tracking-tight">
            Welcome back!
          </h1>
          <p className="text-muted-foreground text-sm">
            Enter your detals to continue.
          </p>
        </div>
        <SigninForm redirectTo="/dashboard" />
      </div>
    </div>
  );
}
