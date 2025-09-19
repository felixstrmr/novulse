import { CircleBoltIcon } from "@/components/icons/circle-bolt-icon";
import { CircleCheckIcon } from "@/components/icons/circle-check-icon";
import { CirclePauseIcon } from "@/components/icons/circle-pause-icon";
import { CirclePlayIcon } from "@/components/icons/circle-play-icon";
import type { PROJECT_STATUSES } from "@/lib/constants";
import { cn } from "@/lib/utils";

type Props = {
  status: (typeof PROJECT_STATUSES)[number];
  className?: string;
};

export default function ProjectStatusIcon({ status, className }: Props) {
  const Icon = {
    "Not Started": CircleBoltIcon,
    Planned: CircleBoltIcon,
    "In Progress": CirclePlayIcon,
    "On Hold": CirclePauseIcon,
    Completed: CircleCheckIcon,
    Cancelled: CircleCheckIcon,
  }[status];

  const color = {
    "Not Started": "text-foreground",
    Planned: "text-yellow-500",
    "In Progress": "text-blue-500",
    "On Hold": "text-yellow-500",
    Completed: "text-green-500",
    Cancelled: "text-red-500",
  }[status];

  return <Icon className={cn("size-4", color, className)} />;
}
