import type { auth } from "@/lib/auth";

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
  status: string;
  priority: string;
  startDate: Date | null;
  endDate: Date | null;
  clientId: string;
  clientName: string;
};
