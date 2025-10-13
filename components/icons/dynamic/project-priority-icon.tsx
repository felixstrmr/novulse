import {
  ChevronsDownIcon,
  ChevronsUpIcon,
  EqualIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { cn } from "@/utils/ui";

export default function ProjectPriorityIcon({
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
      ChevronsUp: ChevronsUpIcon,
      ChevronsDown: ChevronsDownIcon,
      Equal: EqualIcon,
      TriangleAlert: TriangleAlertIcon,
    }[icon] ?? EqualIcon;

  return <Icon className={cn("size-4", className)} style={style} />;
}
