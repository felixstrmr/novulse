import {
  AvatarFallback,
  AvatarImage,
  Avatar as AvatarRoot,
} from "@/components/ui/avatar";
import { cn } from "@/utils/ui";

export default function Avatar({
  value,
  avatar,
  size = "default",
}: {
  value: string;
  avatar?: string;
  size?: "default" | "sm" | "lg";
}) {
  const sizeClass = {
    default: "size-8 text-sm",
    sm: "size-7 text-xs",
    lg: "size-9 text-sm",
  }[size];

  const initials = value
    .split(" ")
    .map((name) => name[0])
    .join("");

  return (
    <AvatarRoot className={cn(sizeClass, "rounded-md")}>
      <AvatarImage className={cn(sizeClass, "rounded-md")} src={avatar} />
      <AvatarFallback
        className={cn(sizeClass, "rounded-md border text-muted-foreground")}
      >
        {initials}
      </AvatarFallback>
    </AvatarRoot>
  );
}
