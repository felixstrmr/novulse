import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils/ui";

export default function ClientStatusBadge({ isActive }: { isActive: boolean }) {
  const classNames = {
    active: "bg-green-100 text-green-600",
    inactive: "bg-yellow-100 text-yellow-600",
  };

  return (
    <Badge
      className={cn(
        "rounded-sm px-1",
        classNames[isActive ? "active" : "inactive"]
      )}
    >
      {isActive ? "Active" : "Inactive"}
    </Badge>
  );
}
