import {
  AvatarFallback,
  AvatarImage,
  Avatar as AvatarUI,
} from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type Props = {
  value: string;
  image?: string | null;
  size: "xs" | "sm" | "default" | "lg";
};

export default function Avatar({ value, image, size = "default" }: Props) {
  const sizeClass = {
    xs: "size-6 text-xs rounded-md",
    sm: "size-7 text-xs rounded-md",
    default: "size-8 text-sm rounded-md",
    lg: "size-9 text-sm rounded-md",
  }[size];

  const initials = value
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  return (
    <AvatarUI className={sizeClass}>
      <AvatarImage className={sizeClass} src={image ?? undefined} />
      <AvatarFallback className={cn("border", sizeClass)}>
        {initials}
      </AvatarFallback>
    </AvatarUI>
  );
}
