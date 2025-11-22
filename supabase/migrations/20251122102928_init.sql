create type "public"."workspace_user_roles" as enum ('owner', 'manager', 'designer', 'client');


  create table "public"."client_files" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "workspace" uuid not null,
    "client" uuid not null,
    "file" uuid not null
      );


alter table "public"."client_files" enable row level security;


  create table "public"."client_users" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "workspace" uuid not null,
    "client" uuid not null,
    "user" uuid not null
      );


alter table "public"."client_users" enable row level security;


  create table "public"."clients" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "workspace" uuid not null,
    "name" text not null,
    "slug" text not null,
    "is_active" boolean not null default true,
    "created_by" uuid default auth.uid()
      );


alter table "public"."clients" enable row level security;


  create table "public"."file_folders" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "workspace" uuid not null,
    "name" text not null,
    "client" uuid,
    "project" uuid,
    "task" uuid,
    "is_locked" boolean not null default false
      );


alter table "public"."file_folders" enable row level security;


  create table "public"."files" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "workspace" uuid not null,
    "name" text not null,
    "path" text[] not null,
    "type" text not null,
    "size" numeric not null
      );


alter table "public"."files" enable row level security;


  create table "public"."project_statuses" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "workspace" uuid not null,
    "name" text not null,
    "icon" text not null,
    "color" text not null,
    "order" numeric not null,
    "is_default" boolean not null default false
      );


alter table "public"."project_statuses" enable row level security;


  create table "public"."projects" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "workspace" uuid not null,
    "name" text not null,
    "description" text,
    "status" uuid not null,
    "created_by" uuid default auth.uid(),
    "client" uuid not null,
    "start_date" timestamp with time zone,
    "end_date" timestamp with time zone
      );


alter table "public"."projects" enable row level security;


  create table "public"."task_statuses" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "workspace" uuid not null,
    "name" text not null,
    "icon" text not null,
    "color" text not null,
    "order" numeric not null,
    "is_default" boolean not null default false
      );


alter table "public"."task_statuses" enable row level security;


  create table "public"."tasks" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "workspace" uuid not null,
    "name" text not null,
    "description" text,
    "status" uuid not null,
    "created_by" uuid default auth.uid(),
    "project" uuid not null
      );


alter table "public"."tasks" enable row level security;


  create table "public"."users" (
    "id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "email" text not null
      );


alter table "public"."users" enable row level security;


  create table "public"."workspace_users" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "workspace" uuid not null,
    "user" uuid not null,
    "role" public.workspace_user_roles not null
      );


alter table "public"."workspace_users" enable row level security;


  create table "public"."workspaces" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "name" text not null,
    "domain" text not null,
    "settings" jsonb not null default '{}'::jsonb
      );


alter table "public"."workspaces" enable row level security;

CREATE UNIQUE INDEX client_files_pkey ON public.client_files USING btree (id);

CREATE UNIQUE INDEX client_users_pkey ON public.client_users USING btree (id);

CREATE UNIQUE INDEX clients_pkey ON public.clients USING btree (id);

CREATE UNIQUE INDEX clients_workspace_slug_idx ON public.clients USING btree (workspace, slug);

CREATE UNIQUE INDEX file_folders_pkey ON public.file_folders USING btree (id);

CREATE UNIQUE INDEX files_pkey ON public.files USING btree (id);

CREATE UNIQUE INDEX project_statuses_pkey ON public.project_statuses USING btree (id);

CREATE UNIQUE INDEX projects_pkey ON public.projects USING btree (id);

CREATE UNIQUE INDEX task_statuses_pkey ON public.task_statuses USING btree (id);

CREATE UNIQUE INDEX tasks_pkey ON public.tasks USING btree (id);

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);

CREATE UNIQUE INDEX workspace_users_pkey ON public.workspace_users USING btree (id);

CREATE INDEX workspace_users_user_idx ON public.workspace_users USING btree ("user");

CREATE INDEX workspace_users_workspace_idx ON public.workspace_users USING btree (workspace);

CREATE UNIQUE INDEX workspaces_domain_key ON public.workspaces USING btree (domain);

CREATE UNIQUE INDEX workspaces_pkey ON public.workspaces USING btree (id);

alter table "public"."client_files" add constraint "client_files_pkey" PRIMARY KEY using index "client_files_pkey";

alter table "public"."client_users" add constraint "client_users_pkey" PRIMARY KEY using index "client_users_pkey";

alter table "public"."clients" add constraint "clients_pkey" PRIMARY KEY using index "clients_pkey";

alter table "public"."file_folders" add constraint "file_folders_pkey" PRIMARY KEY using index "file_folders_pkey";

alter table "public"."files" add constraint "files_pkey" PRIMARY KEY using index "files_pkey";

alter table "public"."project_statuses" add constraint "project_statuses_pkey" PRIMARY KEY using index "project_statuses_pkey";

alter table "public"."projects" add constraint "projects_pkey" PRIMARY KEY using index "projects_pkey";

alter table "public"."task_statuses" add constraint "task_statuses_pkey" PRIMARY KEY using index "task_statuses_pkey";

alter table "public"."tasks" add constraint "tasks_pkey" PRIMARY KEY using index "tasks_pkey";

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."workspace_users" add constraint "workspace_users_pkey" PRIMARY KEY using index "workspace_users_pkey";

alter table "public"."workspaces" add constraint "workspaces_pkey" PRIMARY KEY using index "workspaces_pkey";

alter table "public"."client_files" add constraint "client_files_client_fkey" FOREIGN KEY (client) REFERENCES public.clients(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."client_files" validate constraint "client_files_client_fkey";

alter table "public"."client_files" add constraint "client_files_file_fkey" FOREIGN KEY (file) REFERENCES public.files(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."client_files" validate constraint "client_files_file_fkey";

alter table "public"."client_files" add constraint "client_files_workspace_fkey" FOREIGN KEY (workspace) REFERENCES public.workspaces(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."client_files" validate constraint "client_files_workspace_fkey";

alter table "public"."client_users" add constraint "client_users_client_fkey" FOREIGN KEY (client) REFERENCES public.clients(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."client_users" validate constraint "client_users_client_fkey";

alter table "public"."client_users" add constraint "client_users_user_fkey" FOREIGN KEY ("user") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."client_users" validate constraint "client_users_user_fkey";

alter table "public"."client_users" add constraint "client_users_workspace_fkey" FOREIGN KEY (workspace) REFERENCES public.workspaces(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."client_users" validate constraint "client_users_workspace_fkey";

alter table "public"."clients" add constraint "clients_created_by_fkey" FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."clients" validate constraint "clients_created_by_fkey";

alter table "public"."clients" add constraint "clients_workspace_fkey" FOREIGN KEY (workspace) REFERENCES public.workspaces(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."clients" validate constraint "clients_workspace_fkey";

alter table "public"."file_folders" add constraint "file_folders_client_fkey" FOREIGN KEY (client) REFERENCES public.clients(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."file_folders" validate constraint "file_folders_client_fkey";

alter table "public"."file_folders" add constraint "file_folders_project_fkey" FOREIGN KEY (project) REFERENCES public.projects(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."file_folders" validate constraint "file_folders_project_fkey";

alter table "public"."file_folders" add constraint "file_folders_task_fkey" FOREIGN KEY (task) REFERENCES public.tasks(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."file_folders" validate constraint "file_folders_task_fkey";

alter table "public"."file_folders" add constraint "file_folders_workspace_fkey" FOREIGN KEY (workspace) REFERENCES public.workspaces(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."file_folders" validate constraint "file_folders_workspace_fkey";

alter table "public"."files" add constraint "files_workspace_fkey" FOREIGN KEY (workspace) REFERENCES public.workspaces(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."files" validate constraint "files_workspace_fkey";

alter table "public"."project_statuses" add constraint "project_statuses_workspace_fkey" FOREIGN KEY (workspace) REFERENCES public.workspaces(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."project_statuses" validate constraint "project_statuses_workspace_fkey";

alter table "public"."projects" add constraint "projects_client_fkey" FOREIGN KEY (client) REFERENCES public.clients(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."projects" validate constraint "projects_client_fkey";

alter table "public"."projects" add constraint "projects_created_by_fkey" FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."projects" validate constraint "projects_created_by_fkey";

alter table "public"."projects" add constraint "projects_status_fkey" FOREIGN KEY (status) REFERENCES public.project_statuses(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."projects" validate constraint "projects_status_fkey";

alter table "public"."projects" add constraint "projects_workspace_fkey" FOREIGN KEY (workspace) REFERENCES public.workspaces(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."projects" validate constraint "projects_workspace_fkey";

alter table "public"."task_statuses" add constraint "task_statuses_workspace_fkey" FOREIGN KEY (workspace) REFERENCES public.workspaces(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."task_statuses" validate constraint "task_statuses_workspace_fkey";

alter table "public"."tasks" add constraint "tasks_client_fkey" FOREIGN KEY (project) REFERENCES public.clients(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."tasks" validate constraint "tasks_client_fkey";

alter table "public"."tasks" add constraint "tasks_created_by_fkey" FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."tasks" validate constraint "tasks_created_by_fkey";

alter table "public"."tasks" add constraint "tasks_project_fkey" FOREIGN KEY (project) REFERENCES public.projects(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."tasks" validate constraint "tasks_project_fkey";

alter table "public"."tasks" add constraint "tasks_status_fkey" FOREIGN KEY (status) REFERENCES public.project_statuses(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."tasks" validate constraint "tasks_status_fkey";

alter table "public"."tasks" add constraint "tasks_status_fkey1" FOREIGN KEY (status) REFERENCES public.task_statuses(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."tasks" validate constraint "tasks_status_fkey1";

alter table "public"."tasks" add constraint "tasks_workspace_fkey" FOREIGN KEY (workspace) REFERENCES public.workspaces(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."tasks" validate constraint "tasks_workspace_fkey";

alter table "public"."tasks" add constraint "tasks_workspace_fkey1" FOREIGN KEY (workspace) REFERENCES public.workspaces(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."tasks" validate constraint "tasks_workspace_fkey1";

alter table "public"."users" add constraint "users_email_key" UNIQUE using index "users_email_key";

alter table "public"."users" add constraint "users_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."users" validate constraint "users_id_fkey";

alter table "public"."workspace_users" add constraint "workspace_users_user_fkey" FOREIGN KEY ("user") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."workspace_users" validate constraint "workspace_users_user_fkey";

alter table "public"."workspace_users" add constraint "workspace_users_workspace_fkey" FOREIGN KEY (workspace) REFERENCES public.workspaces(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."workspace_users" validate constraint "workspace_users_workspace_fkey";

alter table "public"."workspaces" add constraint "workspaces_domain_key" UNIQUE using index "workspaces_domain_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
  insert into public.users (id, email)
  values (new.id, new.email);
  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.is_workspace_manager(workspace_id uuid, user_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM public.workspace_users 
    WHERE workspace_users.workspace = workspace_id 
    AND workspace_users.user = user_id
    AND (workspace_users.role = 'manager' or workspace_users.role = 'owner')
  );
END;
$function$
;

CREATE OR REPLACE FUNCTION public.is_workspace_user(workspace_id uuid, user_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM public.workspace_users 
    WHERE workspace_users.workspace = workspace_id 
    AND workspace_users.user = user_id
  );
END;
$function$
;

grant delete on table "public"."client_files" to "anon";

grant insert on table "public"."client_files" to "anon";

grant references on table "public"."client_files" to "anon";

grant select on table "public"."client_files" to "anon";

grant trigger on table "public"."client_files" to "anon";

grant truncate on table "public"."client_files" to "anon";

grant update on table "public"."client_files" to "anon";

grant delete on table "public"."client_files" to "authenticated";

grant insert on table "public"."client_files" to "authenticated";

grant references on table "public"."client_files" to "authenticated";

grant select on table "public"."client_files" to "authenticated";

grant trigger on table "public"."client_files" to "authenticated";

grant truncate on table "public"."client_files" to "authenticated";

grant update on table "public"."client_files" to "authenticated";

grant delete on table "public"."client_files" to "postgres";

grant insert on table "public"."client_files" to "postgres";

grant references on table "public"."client_files" to "postgres";

grant select on table "public"."client_files" to "postgres";

grant trigger on table "public"."client_files" to "postgres";

grant truncate on table "public"."client_files" to "postgres";

grant update on table "public"."client_files" to "postgres";

grant delete on table "public"."client_files" to "service_role";

grant insert on table "public"."client_files" to "service_role";

grant references on table "public"."client_files" to "service_role";

grant select on table "public"."client_files" to "service_role";

grant trigger on table "public"."client_files" to "service_role";

grant truncate on table "public"."client_files" to "service_role";

grant update on table "public"."client_files" to "service_role";

grant delete on table "public"."client_users" to "anon";

grant insert on table "public"."client_users" to "anon";

grant references on table "public"."client_users" to "anon";

grant select on table "public"."client_users" to "anon";

grant trigger on table "public"."client_users" to "anon";

grant truncate on table "public"."client_users" to "anon";

grant update on table "public"."client_users" to "anon";

grant delete on table "public"."client_users" to "authenticated";

grant insert on table "public"."client_users" to "authenticated";

grant references on table "public"."client_users" to "authenticated";

grant select on table "public"."client_users" to "authenticated";

grant trigger on table "public"."client_users" to "authenticated";

grant truncate on table "public"."client_users" to "authenticated";

grant update on table "public"."client_users" to "authenticated";

grant delete on table "public"."client_users" to "postgres";

grant insert on table "public"."client_users" to "postgres";

grant references on table "public"."client_users" to "postgres";

grant select on table "public"."client_users" to "postgres";

grant trigger on table "public"."client_users" to "postgres";

grant truncate on table "public"."client_users" to "postgres";

grant update on table "public"."client_users" to "postgres";

grant delete on table "public"."client_users" to "service_role";

grant insert on table "public"."client_users" to "service_role";

grant references on table "public"."client_users" to "service_role";

grant select on table "public"."client_users" to "service_role";

grant trigger on table "public"."client_users" to "service_role";

grant truncate on table "public"."client_users" to "service_role";

grant update on table "public"."client_users" to "service_role";

grant delete on table "public"."clients" to "anon";

grant insert on table "public"."clients" to "anon";

grant references on table "public"."clients" to "anon";

grant select on table "public"."clients" to "anon";

grant trigger on table "public"."clients" to "anon";

grant truncate on table "public"."clients" to "anon";

grant update on table "public"."clients" to "anon";

grant delete on table "public"."clients" to "authenticated";

grant insert on table "public"."clients" to "authenticated";

grant references on table "public"."clients" to "authenticated";

grant select on table "public"."clients" to "authenticated";

grant trigger on table "public"."clients" to "authenticated";

grant truncate on table "public"."clients" to "authenticated";

grant update on table "public"."clients" to "authenticated";

grant delete on table "public"."clients" to "postgres";

grant insert on table "public"."clients" to "postgres";

grant references on table "public"."clients" to "postgres";

grant select on table "public"."clients" to "postgres";

grant trigger on table "public"."clients" to "postgres";

grant truncate on table "public"."clients" to "postgres";

grant update on table "public"."clients" to "postgres";

grant delete on table "public"."clients" to "service_role";

grant insert on table "public"."clients" to "service_role";

grant references on table "public"."clients" to "service_role";

grant select on table "public"."clients" to "service_role";

grant trigger on table "public"."clients" to "service_role";

grant truncate on table "public"."clients" to "service_role";

grant update on table "public"."clients" to "service_role";

grant delete on table "public"."file_folders" to "anon";

grant insert on table "public"."file_folders" to "anon";

grant references on table "public"."file_folders" to "anon";

grant select on table "public"."file_folders" to "anon";

grant trigger on table "public"."file_folders" to "anon";

grant truncate on table "public"."file_folders" to "anon";

grant update on table "public"."file_folders" to "anon";

grant delete on table "public"."file_folders" to "authenticated";

grant insert on table "public"."file_folders" to "authenticated";

grant references on table "public"."file_folders" to "authenticated";

grant select on table "public"."file_folders" to "authenticated";

grant trigger on table "public"."file_folders" to "authenticated";

grant truncate on table "public"."file_folders" to "authenticated";

grant update on table "public"."file_folders" to "authenticated";

grant delete on table "public"."file_folders" to "postgres";

grant insert on table "public"."file_folders" to "postgres";

grant references on table "public"."file_folders" to "postgres";

grant select on table "public"."file_folders" to "postgres";

grant trigger on table "public"."file_folders" to "postgres";

grant truncate on table "public"."file_folders" to "postgres";

grant update on table "public"."file_folders" to "postgres";

grant delete on table "public"."file_folders" to "service_role";

grant insert on table "public"."file_folders" to "service_role";

grant references on table "public"."file_folders" to "service_role";

grant select on table "public"."file_folders" to "service_role";

grant trigger on table "public"."file_folders" to "service_role";

grant truncate on table "public"."file_folders" to "service_role";

grant update on table "public"."file_folders" to "service_role";

grant delete on table "public"."files" to "anon";

grant insert on table "public"."files" to "anon";

grant references on table "public"."files" to "anon";

grant select on table "public"."files" to "anon";

grant trigger on table "public"."files" to "anon";

grant truncate on table "public"."files" to "anon";

grant update on table "public"."files" to "anon";

grant delete on table "public"."files" to "authenticated";

grant insert on table "public"."files" to "authenticated";

grant references on table "public"."files" to "authenticated";

grant select on table "public"."files" to "authenticated";

grant trigger on table "public"."files" to "authenticated";

grant truncate on table "public"."files" to "authenticated";

grant update on table "public"."files" to "authenticated";

grant delete on table "public"."files" to "postgres";

grant insert on table "public"."files" to "postgres";

grant references on table "public"."files" to "postgres";

grant select on table "public"."files" to "postgres";

grant trigger on table "public"."files" to "postgres";

grant truncate on table "public"."files" to "postgres";

grant update on table "public"."files" to "postgres";

grant delete on table "public"."files" to "service_role";

grant insert on table "public"."files" to "service_role";

grant references on table "public"."files" to "service_role";

grant select on table "public"."files" to "service_role";

grant trigger on table "public"."files" to "service_role";

grant truncate on table "public"."files" to "service_role";

grant update on table "public"."files" to "service_role";

grant delete on table "public"."project_statuses" to "anon";

grant insert on table "public"."project_statuses" to "anon";

grant references on table "public"."project_statuses" to "anon";

grant select on table "public"."project_statuses" to "anon";

grant trigger on table "public"."project_statuses" to "anon";

grant truncate on table "public"."project_statuses" to "anon";

grant update on table "public"."project_statuses" to "anon";

grant delete on table "public"."project_statuses" to "authenticated";

grant insert on table "public"."project_statuses" to "authenticated";

grant references on table "public"."project_statuses" to "authenticated";

grant select on table "public"."project_statuses" to "authenticated";

grant trigger on table "public"."project_statuses" to "authenticated";

grant truncate on table "public"."project_statuses" to "authenticated";

grant update on table "public"."project_statuses" to "authenticated";

grant delete on table "public"."project_statuses" to "postgres";

grant insert on table "public"."project_statuses" to "postgres";

grant references on table "public"."project_statuses" to "postgres";

grant select on table "public"."project_statuses" to "postgres";

grant trigger on table "public"."project_statuses" to "postgres";

grant truncate on table "public"."project_statuses" to "postgres";

grant update on table "public"."project_statuses" to "postgres";

grant delete on table "public"."project_statuses" to "service_role";

grant insert on table "public"."project_statuses" to "service_role";

grant references on table "public"."project_statuses" to "service_role";

grant select on table "public"."project_statuses" to "service_role";

grant trigger on table "public"."project_statuses" to "service_role";

grant truncate on table "public"."project_statuses" to "service_role";

grant update on table "public"."project_statuses" to "service_role";

grant delete on table "public"."projects" to "anon";

grant insert on table "public"."projects" to "anon";

grant references on table "public"."projects" to "anon";

grant select on table "public"."projects" to "anon";

grant trigger on table "public"."projects" to "anon";

grant truncate on table "public"."projects" to "anon";

grant update on table "public"."projects" to "anon";

grant delete on table "public"."projects" to "authenticated";

grant insert on table "public"."projects" to "authenticated";

grant references on table "public"."projects" to "authenticated";

grant select on table "public"."projects" to "authenticated";

grant trigger on table "public"."projects" to "authenticated";

grant truncate on table "public"."projects" to "authenticated";

grant update on table "public"."projects" to "authenticated";

grant delete on table "public"."projects" to "postgres";

grant insert on table "public"."projects" to "postgres";

grant references on table "public"."projects" to "postgres";

grant select on table "public"."projects" to "postgres";

grant trigger on table "public"."projects" to "postgres";

grant truncate on table "public"."projects" to "postgres";

grant update on table "public"."projects" to "postgres";

grant delete on table "public"."projects" to "service_role";

grant insert on table "public"."projects" to "service_role";

grant references on table "public"."projects" to "service_role";

grant select on table "public"."projects" to "service_role";

grant trigger on table "public"."projects" to "service_role";

grant truncate on table "public"."projects" to "service_role";

grant update on table "public"."projects" to "service_role";

grant delete on table "public"."task_statuses" to "anon";

grant insert on table "public"."task_statuses" to "anon";

grant references on table "public"."task_statuses" to "anon";

grant select on table "public"."task_statuses" to "anon";

grant trigger on table "public"."task_statuses" to "anon";

grant truncate on table "public"."task_statuses" to "anon";

grant update on table "public"."task_statuses" to "anon";

grant delete on table "public"."task_statuses" to "authenticated";

grant insert on table "public"."task_statuses" to "authenticated";

grant references on table "public"."task_statuses" to "authenticated";

grant select on table "public"."task_statuses" to "authenticated";

grant trigger on table "public"."task_statuses" to "authenticated";

grant truncate on table "public"."task_statuses" to "authenticated";

grant update on table "public"."task_statuses" to "authenticated";

grant delete on table "public"."task_statuses" to "postgres";

grant insert on table "public"."task_statuses" to "postgres";

grant references on table "public"."task_statuses" to "postgres";

grant select on table "public"."task_statuses" to "postgres";

grant trigger on table "public"."task_statuses" to "postgres";

grant truncate on table "public"."task_statuses" to "postgres";

grant update on table "public"."task_statuses" to "postgres";

grant delete on table "public"."task_statuses" to "service_role";

grant insert on table "public"."task_statuses" to "service_role";

grant references on table "public"."task_statuses" to "service_role";

grant select on table "public"."task_statuses" to "service_role";

grant trigger on table "public"."task_statuses" to "service_role";

grant truncate on table "public"."task_statuses" to "service_role";

grant update on table "public"."task_statuses" to "service_role";

grant delete on table "public"."tasks" to "anon";

grant insert on table "public"."tasks" to "anon";

grant references on table "public"."tasks" to "anon";

grant select on table "public"."tasks" to "anon";

grant trigger on table "public"."tasks" to "anon";

grant truncate on table "public"."tasks" to "anon";

grant update on table "public"."tasks" to "anon";

grant delete on table "public"."tasks" to "authenticated";

grant insert on table "public"."tasks" to "authenticated";

grant references on table "public"."tasks" to "authenticated";

grant select on table "public"."tasks" to "authenticated";

grant trigger on table "public"."tasks" to "authenticated";

grant truncate on table "public"."tasks" to "authenticated";

grant update on table "public"."tasks" to "authenticated";

grant delete on table "public"."tasks" to "postgres";

grant insert on table "public"."tasks" to "postgres";

grant references on table "public"."tasks" to "postgres";

grant select on table "public"."tasks" to "postgres";

grant trigger on table "public"."tasks" to "postgres";

grant truncate on table "public"."tasks" to "postgres";

grant update on table "public"."tasks" to "postgres";

grant delete on table "public"."tasks" to "service_role";

grant insert on table "public"."tasks" to "service_role";

grant references on table "public"."tasks" to "service_role";

grant select on table "public"."tasks" to "service_role";

grant trigger on table "public"."tasks" to "service_role";

grant truncate on table "public"."tasks" to "service_role";

grant update on table "public"."tasks" to "service_role";

grant delete on table "public"."users" to "anon";

grant insert on table "public"."users" to "anon";

grant references on table "public"."users" to "anon";

grant select on table "public"."users" to "anon";

grant trigger on table "public"."users" to "anon";

grant truncate on table "public"."users" to "anon";

grant update on table "public"."users" to "anon";

grant delete on table "public"."users" to "authenticated";

grant insert on table "public"."users" to "authenticated";

grant references on table "public"."users" to "authenticated";

grant select on table "public"."users" to "authenticated";

grant trigger on table "public"."users" to "authenticated";

grant truncate on table "public"."users" to "authenticated";

grant update on table "public"."users" to "authenticated";

grant delete on table "public"."users" to "postgres";

grant insert on table "public"."users" to "postgres";

grant references on table "public"."users" to "postgres";

grant select on table "public"."users" to "postgres";

grant trigger on table "public"."users" to "postgres";

grant truncate on table "public"."users" to "postgres";

grant update on table "public"."users" to "postgres";

grant delete on table "public"."users" to "service_role";

grant insert on table "public"."users" to "service_role";

grant references on table "public"."users" to "service_role";

grant select on table "public"."users" to "service_role";

grant trigger on table "public"."users" to "service_role";

grant truncate on table "public"."users" to "service_role";

grant update on table "public"."users" to "service_role";

grant delete on table "public"."workspace_users" to "anon";

grant insert on table "public"."workspace_users" to "anon";

grant references on table "public"."workspace_users" to "anon";

grant select on table "public"."workspace_users" to "anon";

grant trigger on table "public"."workspace_users" to "anon";

grant truncate on table "public"."workspace_users" to "anon";

grant update on table "public"."workspace_users" to "anon";

grant delete on table "public"."workspace_users" to "authenticated";

grant insert on table "public"."workspace_users" to "authenticated";

grant references on table "public"."workspace_users" to "authenticated";

grant select on table "public"."workspace_users" to "authenticated";

grant trigger on table "public"."workspace_users" to "authenticated";

grant truncate on table "public"."workspace_users" to "authenticated";

grant update on table "public"."workspace_users" to "authenticated";

grant delete on table "public"."workspace_users" to "postgres";

grant insert on table "public"."workspace_users" to "postgres";

grant references on table "public"."workspace_users" to "postgres";

grant select on table "public"."workspace_users" to "postgres";

grant trigger on table "public"."workspace_users" to "postgres";

grant truncate on table "public"."workspace_users" to "postgres";

grant update on table "public"."workspace_users" to "postgres";

grant delete on table "public"."workspace_users" to "service_role";

grant insert on table "public"."workspace_users" to "service_role";

grant references on table "public"."workspace_users" to "service_role";

grant select on table "public"."workspace_users" to "service_role";

grant trigger on table "public"."workspace_users" to "service_role";

grant truncate on table "public"."workspace_users" to "service_role";

grant update on table "public"."workspace_users" to "service_role";

grant delete on table "public"."workspaces" to "anon";

grant insert on table "public"."workspaces" to "anon";

grant references on table "public"."workspaces" to "anon";

grant select on table "public"."workspaces" to "anon";

grant trigger on table "public"."workspaces" to "anon";

grant truncate on table "public"."workspaces" to "anon";

grant update on table "public"."workspaces" to "anon";

grant delete on table "public"."workspaces" to "authenticated";

grant insert on table "public"."workspaces" to "authenticated";

grant references on table "public"."workspaces" to "authenticated";

grant select on table "public"."workspaces" to "authenticated";

grant trigger on table "public"."workspaces" to "authenticated";

grant truncate on table "public"."workspaces" to "authenticated";

grant update on table "public"."workspaces" to "authenticated";

grant delete on table "public"."workspaces" to "postgres";

grant insert on table "public"."workspaces" to "postgres";

grant references on table "public"."workspaces" to "postgres";

grant select on table "public"."workspaces" to "postgres";

grant trigger on table "public"."workspaces" to "postgres";

grant truncate on table "public"."workspaces" to "postgres";

grant update on table "public"."workspaces" to "postgres";

grant delete on table "public"."workspaces" to "service_role";

grant insert on table "public"."workspaces" to "service_role";

grant references on table "public"."workspaces" to "service_role";

grant select on table "public"."workspaces" to "service_role";

grant trigger on table "public"."workspaces" to "service_role";

grant truncate on table "public"."workspaces" to "service_role";

grant update on table "public"."workspaces" to "service_role";


  create policy "Select -> Workspace User"
  on "public"."client_files"
  as permissive
  for select
  to authenticated
using (public.is_workspace_user(workspace, ( SELECT auth.uid() AS uid)));



  create policy "Select -> Workspace User"
  on "public"."client_users"
  as permissive
  for select
  to authenticated
using (public.is_workspace_user(workspace, ( SELECT auth.uid() AS uid)));



  create policy "Insert -> Workspace User"
  on "public"."clients"
  as permissive
  for insert
  to authenticated
with check (public.is_workspace_user(workspace, ( SELECT auth.uid() AS uid)));



  create policy "Select -> Workspace User"
  on "public"."clients"
  as permissive
  for select
  to authenticated
using (public.is_workspace_user(workspace, ( SELECT auth.uid() AS uid)));



  create policy "Select -> Workspace User"
  on "public"."file_folders"
  as permissive
  for select
  to authenticated
using (public.is_workspace_user(workspace, ( SELECT auth.uid() AS uid)));



  create policy "Select -> Workspace User"
  on "public"."files"
  as permissive
  for select
  to authenticated
using (public.is_workspace_user(workspace, ( SELECT auth.uid() AS uid)));



  create policy "Select -> Workspace User"
  on "public"."project_statuses"
  as permissive
  for select
  to authenticated
using (public.is_workspace_user(workspace, ( SELECT auth.uid() AS uid)));



  create policy "Select -> Workspace User"
  on "public"."projects"
  as permissive
  for select
  to authenticated
using (public.is_workspace_user(workspace, ( SELECT auth.uid() AS uid)));



  create policy "Update -> Workspace User"
  on "public"."projects"
  as permissive
  for update
  to authenticated
using (public.is_workspace_user(workspace, ( SELECT auth.uid() AS uid)));



  create policy "Select -> Workspace User"
  on "public"."task_statuses"
  as permissive
  for select
  to authenticated
using (public.is_workspace_user(workspace, ( SELECT auth.uid() AS uid)));



  create policy "Select -> Workspace User"
  on "public"."tasks"
  as permissive
  for select
  to authenticated
using (public.is_workspace_user(workspace, ( SELECT auth.uid() AS uid)));



  create policy "Select -> Authenticated"
  on "public"."users"
  as permissive
  for select
  to authenticated
using (true);



  create policy "Select -> Workspace User"
  on "public"."workspace_users"
  as permissive
  for select
  to authenticated
using (public.is_workspace_user(workspace, ( SELECT auth.uid() AS uid)));



  create policy "Select -> Workspace User"
  on "public"."workspaces"
  as permissive
  for select
  to authenticated
using (public.is_workspace_user(id, ( SELECT auth.uid() AS uid)));


CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


  create policy "Insert -> Authenticated 1m0cqf_0"
  on "storage"."objects"
  as permissive
  for insert
  to authenticated
with check ((bucket_id = 'files'::text));



