export const VALID_HOME_ROUTES = ["/"];

export const VALID_API_ROUTES = ["/auth"];

export const VALID_APP_ROUTES = ["/", "/signin"];
export const PUBLIC_APP_ROUTES = ["/signin"];

export const PROJECT_STATUSES = [
  "Not Started",
  "In Progress",
  "On Hold",
  "Completed",
] as const;

export const PROJECT_PRIORITIES = ["Low", "Medium", "High"] as const;

export const TASK_STATUSES = [
  "Not Started",
  "In Progress",
  "Ready for Review",
  "Completed",
] as const;
