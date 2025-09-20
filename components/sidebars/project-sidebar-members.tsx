"use client";

import Avatar from "@/components/avatar";
import type { ProjectUser } from "@/types";

type Props = {
  projectUsers: ProjectUser[];
};

export default function ProjectSidebarMembers({ projectUsers }: Props) {
  return (
    <div className="space-y-2 border-b p-4">
      <p className="text-muted-foreground text-xs">Members</p>
      <div className="space-y-2">
        {projectUsers.map((user) => (
          <div
            className="flex items-center gap-2 rounded-lg p-2 hover:bg-muted"
            key={user.userId}
          >
            <Avatar image={user.userImage} size="xs" value={user.userName} />
            <p className="text-sm">{user.userName}</p>
            <p className="text-muted-foreground text-sm">•</p>
            <p className="text-muted-foreground text-sm">{user.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
