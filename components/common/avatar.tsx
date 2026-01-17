import {
  AvatarFallback,
  AvatarImage,
  Avatar as AvatarPrimitive,
} from "@/components/ui/avatar";

export default function Avatar({
  avatar,
  value,
  size = "default",
}: {
  avatar: string | null;
  value: string;
  size?: "default" | "sm" | "lg";
}) {
  const sizeClass = {
    default: "size-8 rounded-md ",
    sm: "size-7 rounded-md ",
    lg: "size-9 rounded-md ",
  }[size];

  const initials = value
    .split(" ")
    .map((name) => name.charAt(0).toUpperCase())
    .join("");

  return (
    <AvatarPrimitive className={sizeClass}>
      <AvatarImage src={avatar ?? undefined} />
      <AvatarFallback className={sizeClass}>{initials}</AvatarFallback>
    </AvatarPrimitive>
  );
}
