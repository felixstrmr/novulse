import { MailIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function EmailInput({
  ...props
}: React.ComponentProps<"input">) {
  return (
    <div className="relative">
      <MailIcon className="-translate-y-1/2 absolute top-1/2 left-3 size-4 text-muted-foreground" />
      <Input
        className="bg-background pl-9"
        id="email-input"
        placeholder="you@example.com"
        type="email"
        {...props}
      />
    </div>
  );
}
