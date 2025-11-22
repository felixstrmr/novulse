import {
  Avatar as AvatarComponent,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { cn } from "@/utils/ui";

export default function Avatar({
  value,
  avatar,
  size = "md",
}: {
  value: string;
  avatar?: string | undefined;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClassNames = {
    sm: "size-7 text-xs",
    md: "size-8 text-sm",
    lg: "size-9 text-sm",
  };

  const initials = value
    .split(" ")
    .map((name) => name[0])
    .join("");

  return (
    <AvatarComponent className={cn("rounded-md", sizeClassNames[size])}>
      <AvatarImage src={avatar} />
      <AvatarFallback className={cn("rounded-md border", sizeClassNames[size])}>
        {initials}
      </AvatarFallback>
    </AvatarComponent>
  );
}
