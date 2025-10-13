import {
  CircleArrowRightIcon,
  CircleCheckIcon,
  CircleDashedIcon,
  CirclePlayIcon,
  CircleXIcon,
} from "lucide-react";
import { cn } from "@/utils/ui";

export default function ProjectStatusIcon({
  icon,
  className,
  style,
}: {
  icon: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const Icon =
    {
      CircleDashed: CircleDashedIcon,
      CircleCheck: CircleCheckIcon,
      CircleX: CircleXIcon,
      CircleArrowRight: CircleArrowRightIcon,
      CirclePlay: CirclePlayIcon,
    }[icon] ?? CircleDashedIcon;

  return <Icon className={cn("size-4", className)} style={style} />;
}
