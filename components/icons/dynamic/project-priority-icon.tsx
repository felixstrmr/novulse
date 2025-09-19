import { PriorityHighIcon } from "@/components/icons/priority-high-icon";
import { PriorityLowIcon } from "@/components/icons/priority-low-icon";
import { PriorityMediumIcon } from "@/components/icons/priority-medium-icon";
import type { PROJECT_PRIORITIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

type Props = {
  priority: (typeof PROJECT_PRIORITIES)[number];
  className?: string;
};

export default function ProjectPriorityIcon({ priority, className }: Props) {
  const Icon = {
    Low: PriorityLowIcon,
    Medium: PriorityMediumIcon,
    High: PriorityHighIcon,
  }[priority];

  const color = {
    Low: "text-green-500",
    Medium: "text-yellow-500",
    High: "text-red-500",
  }[priority];

  return <Icon className={cn("size-4", color, className)} />;
}
