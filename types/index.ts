import type { SupabaseClient } from "@supabase/supabase-js";
import type { getWorkspaces } from "@/queries/workspaces";
import type { Database } from "@/types/supabase";

export type Supabase = SupabaseClient<Database>;

export type Workspace = Awaited<ReturnType<typeof getWorkspaces>>[number];
