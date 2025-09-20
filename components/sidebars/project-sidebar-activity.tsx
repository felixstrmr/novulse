import { formatDistanceToNow } from "date-fns";
import Avatar from "@/components/avatar";
import type { Activity } from "@/types";

type Props = {
  activities: Activity[];
};

export default function ProjectSidebarActivity({ activities }: Props) {
  return (
    <div className="space-y-4 p-4">
      <p className="text-muted-foreground text-xs">Activity</p>
      <div className="relative space-y-4">
        <div className="absolute top-0 bottom-0 left-3 w-px bg-border" />

        {activities.map((activity) => (
          <div className="relative flex items-start gap-3" key={activity.id}>
            <div className="relative z-10 bg-background">
              <Avatar
                image={activity.userImage}
                size="xs"
                value={activity.userName}
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-muted-foreground text-xs">
                <span className="font-semibold text-foreground">
                  {activity.userName}
                </span>{" "}
                {activity.description}
              </p>
              <p className="mt-1 text-muted-foreground text-xs">
                {formatDistanceToNow(activity.createdAt, { addSuffix: true })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
