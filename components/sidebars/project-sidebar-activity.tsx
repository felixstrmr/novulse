import type { Activity } from "@/types";

type Props = {
  activities: Activity[];
};

export default function ProjectSidebarActivity({ activities }: Props) {
  return (
    <div className="space-y-4 p-4">
      <p className="text-muted-foreground text-xs">Activity</p>
      <div className="space-y-2">
        {activities.map((activity) => (
          <div className="flex gap-2" key={activity.id}>
            <div className="size-4 min-w-4 rounded-full border bg-muted" />
            <p className="text-muted-foreground text-xs">
              <span className="font-semibold text-foreground">
                {activity.userName}
              </span>{" "}
              {activity.description.replace("%USER%", "")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
