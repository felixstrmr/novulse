import type { auth } from "@/lib/auth";
import type {
  PROJECT_PRIORITIES,
  PROJECT_STATUSES,
  TASK_STATUSES,
} from "@/lib/constants";

export type Session = typeof auth.$Infer.Session;

export type Client = {
  id: string;
  name: string;
  status: string;
  image: string | null;
  website: string | null;
};

export type Project = {
  id: string;
  name: string;
  description: string | null;
  status: (typeof PROJECT_STATUSES)[number];
  priority: (typeof PROJECT_PRIORITIES)[number];
  startDate: Date | null;
  endDate: Date | null;
  clientId: string;
  clientName: string;
};

export type ProjectUser = {
  userId: string;
  userName: string;
  userImage: string | null;
  role: string;
};

export type Task = {
  id: string;
  name: string;
  description: string | null;
  status: (typeof TASK_STATUSES)[number];
};
