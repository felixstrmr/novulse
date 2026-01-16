create type "public"."asset_types" as enum ('hardware', 'software', 'license', 'consumable', 'component', 'accessory', 'virtual', 'cloud_service', 'network_device', 'mobile_device');

create type "public"."workspace_user_roles" as enum ('owner', 'administrator', 'agent', 'customer');


  create table "public"."asset_categories" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "workspace" uuid not null,
    "name" text not null
      );


alter table "public"."asset_categories" enable row level security;


  create table "public"."asset_statuses" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "workspace" uuid not null,
    "name" text not null
      );


alter table "public"."asset_statuses" enable row level security;


  create table "public"."assets" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "workspace" uuid not null,
    "status" uuid not null,
    "category" uuid not null,
    "name" text not null,
    "description" text,
    "type" public.asset_types not null
      );


alter table "public"."assets" enable row level security;


  create table "public"."users" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "email" text not null,
    "avatar" text,
    "first_name" text,
    "last_name" text
      );


alter table "public"."users" enable row level security;


  create table "public"."workspace_users" (
    "created_at" timestamp with time zone not null default now(),
    "workspace" uuid not null,
    "user" uuid not null,
    "role" public.workspace_user_roles not null default 'customer'::public.workspace_user_roles
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

CREATE UNIQUE INDEX asset_statuses_pkey ON public.asset_statuses USING btree (id);

CREATE UNIQUE INDEX asset_types_pkey ON public.asset_categories USING btree (id);

CREATE UNIQUE INDEX assets_pkey ON public.assets USING btree (id);

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);

CREATE UNIQUE INDEX workspace_users_pkey ON public.workspace_users USING btree (workspace, "user");

CREATE UNIQUE INDEX workspaces_domain_key ON public.workspaces USING btree (domain);

CREATE UNIQUE INDEX workspaces_pkey ON public.workspaces USING btree (id);

alter table "public"."asset_categories" add constraint "asset_types_pkey" PRIMARY KEY using index "asset_types_pkey";

alter table "public"."asset_statuses" add constraint "asset_statuses_pkey" PRIMARY KEY using index "asset_statuses_pkey";

alter table "public"."assets" add constraint "assets_pkey" PRIMARY KEY using index "assets_pkey";

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."workspace_users" add constraint "workspace_users_pkey" PRIMARY KEY using index "workspace_users_pkey";

alter table "public"."workspaces" add constraint "workspaces_pkey" PRIMARY KEY using index "workspaces_pkey";

alter table "public"."asset_categories" add constraint "asset_types_workspace_fkey" FOREIGN KEY (workspace) REFERENCES public.workspaces(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."asset_categories" validate constraint "asset_types_workspace_fkey";

alter table "public"."asset_statuses" add constraint "asset_statuses_workspace_fkey" FOREIGN KEY (workspace) REFERENCES public.workspaces(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."asset_statuses" validate constraint "asset_statuses_workspace_fkey";

alter table "public"."assets" add constraint "assets_category_fkey" FOREIGN KEY (category) REFERENCES public.asset_categories(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."assets" validate constraint "assets_category_fkey";

alter table "public"."assets" add constraint "assets_status_fkey" FOREIGN KEY (status) REFERENCES public.asset_statuses(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."assets" validate constraint "assets_status_fkey";

alter table "public"."assets" add constraint "assets_workspace_fkey" FOREIGN KEY (workspace) REFERENCES public.workspaces(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."assets" validate constraint "assets_workspace_fkey";

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
  insert into public.users (id, email, avatar, first_name, last_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'avatar', new.raw_user_meta_data ->> 'first_name', new.raw_user_meta_data ->> 'last_name');
  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.is_workspace_administrator(workspace_id uuid, user_id uuid DEFAULT auth.uid())
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.workspace_users
    WHERE workspace_users.workspace = workspace_id
      AND workspace_users.user = user_id
      AND (workspace_users.role = 'owner' OR workspace_users.role = 'administrator')
  );
END;$function$
;

CREATE OR REPLACE FUNCTION public.is_workspace_agent(workspace_id uuid, user_id uuid DEFAULT auth.uid())
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.workspace_users
    WHERE workspace_users.workspace = workspace_id
      AND workspace_users.user = user_id
      AND (workspace_users.role = 'owner' OR workspace_users.role = 'administrator' OR workspace_users.role = 'agent')
  );
END;$function$
;

CREATE OR REPLACE FUNCTION public.is_workspace_customer(workspace_id uuid, user_id uuid DEFAULT auth.uid())
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.workspace_users
    WHERE workspace_users.workspace = workspace_id
      AND workspace_users.user = user_id
      AND workspace_users.role = 'customer'
  );
END;$function$
;

CREATE OR REPLACE FUNCTION public.is_workspace_owner(workspace_id uuid, user_id uuid DEFAULT auth.uid())
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.workspace_users
    WHERE workspace_users.workspace = workspace_id
      AND workspace_users.user = user_id
      AND workspace_users.role = 'owner'
  );
END;$function$
;

CREATE OR REPLACE FUNCTION public.is_workspace_user(workspace_id uuid, user_id uuid DEFAULT auth.uid())
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.workspace_users
    WHERE workspace_users.workspace = workspace_id
      AND workspace_users.user = user_id
  );
END;$function$
;

grant delete on table "public"."asset_categories" to "anon";

grant insert on table "public"."asset_categories" to "anon";

grant references on table "public"."asset_categories" to "anon";

grant select on table "public"."asset_categories" to "anon";

grant trigger on table "public"."asset_categories" to "anon";

grant truncate on table "public"."asset_categories" to "anon";

grant update on table "public"."asset_categories" to "anon";

grant delete on table "public"."asset_categories" to "authenticated";

grant insert on table "public"."asset_categories" to "authenticated";

grant references on table "public"."asset_categories" to "authenticated";

grant select on table "public"."asset_categories" to "authenticated";

grant trigger on table "public"."asset_categories" to "authenticated";

grant truncate on table "public"."asset_categories" to "authenticated";

grant update on table "public"."asset_categories" to "authenticated";

grant delete on table "public"."asset_categories" to "postgres";

grant insert on table "public"."asset_categories" to "postgres";

grant references on table "public"."asset_categories" to "postgres";

grant select on table "public"."asset_categories" to "postgres";

grant trigger on table "public"."asset_categories" to "postgres";

grant truncate on table "public"."asset_categories" to "postgres";

grant update on table "public"."asset_categories" to "postgres";

grant delete on table "public"."asset_categories" to "service_role";

grant insert on table "public"."asset_categories" to "service_role";

grant references on table "public"."asset_categories" to "service_role";

grant select on table "public"."asset_categories" to "service_role";

grant trigger on table "public"."asset_categories" to "service_role";

grant truncate on table "public"."asset_categories" to "service_role";

grant update on table "public"."asset_categories" to "service_role";

grant delete on table "public"."asset_statuses" to "anon";

grant insert on table "public"."asset_statuses" to "anon";

grant references on table "public"."asset_statuses" to "anon";

grant select on table "public"."asset_statuses" to "anon";

grant trigger on table "public"."asset_statuses" to "anon";

grant truncate on table "public"."asset_statuses" to "anon";

grant update on table "public"."asset_statuses" to "anon";

grant delete on table "public"."asset_statuses" to "authenticated";

grant insert on table "public"."asset_statuses" to "authenticated";

grant references on table "public"."asset_statuses" to "authenticated";

grant select on table "public"."asset_statuses" to "authenticated";

grant trigger on table "public"."asset_statuses" to "authenticated";

grant truncate on table "public"."asset_statuses" to "authenticated";

grant update on table "public"."asset_statuses" to "authenticated";

grant delete on table "public"."asset_statuses" to "postgres";

grant insert on table "public"."asset_statuses" to "postgres";

grant references on table "public"."asset_statuses" to "postgres";

grant select on table "public"."asset_statuses" to "postgres";

grant trigger on table "public"."asset_statuses" to "postgres";

grant truncate on table "public"."asset_statuses" to "postgres";

grant update on table "public"."asset_statuses" to "postgres";

grant delete on table "public"."asset_statuses" to "service_role";

grant insert on table "public"."asset_statuses" to "service_role";

grant references on table "public"."asset_statuses" to "service_role";

grant select on table "public"."asset_statuses" to "service_role";

grant trigger on table "public"."asset_statuses" to "service_role";

grant truncate on table "public"."asset_statuses" to "service_role";

grant update on table "public"."asset_statuses" to "service_role";

grant delete on table "public"."assets" to "anon";

grant insert on table "public"."assets" to "anon";

grant references on table "public"."assets" to "anon";

grant select on table "public"."assets" to "anon";

grant trigger on table "public"."assets" to "anon";

grant truncate on table "public"."assets" to "anon";

grant update on table "public"."assets" to "anon";

grant delete on table "public"."assets" to "authenticated";

grant insert on table "public"."assets" to "authenticated";

grant references on table "public"."assets" to "authenticated";

grant select on table "public"."assets" to "authenticated";

grant trigger on table "public"."assets" to "authenticated";

grant truncate on table "public"."assets" to "authenticated";

grant update on table "public"."assets" to "authenticated";

grant delete on table "public"."assets" to "postgres";

grant insert on table "public"."assets" to "postgres";

grant references on table "public"."assets" to "postgres";

grant select on table "public"."assets" to "postgres";

grant trigger on table "public"."assets" to "postgres";

grant truncate on table "public"."assets" to "postgres";

grant update on table "public"."assets" to "postgres";

grant delete on table "public"."assets" to "service_role";

grant insert on table "public"."assets" to "service_role";

grant references on table "public"."assets" to "service_role";

grant select on table "public"."assets" to "service_role";

grant trigger on table "public"."assets" to "service_role";

grant truncate on table "public"."assets" to "service_role";

grant update on table "public"."assets" to "service_role";

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
  on "public"."asset_categories"
  as permissive
  for select
  to authenticated
using (public.is_workspace_user(workspace));



  create policy "Select -> Workspace User"
  on "public"."asset_statuses"
  as permissive
  for select
  to authenticated
using (public.is_workspace_user(workspace));



  create policy "Select -> Workspace User"
  on "public"."assets"
  as permissive
  for select
  to authenticated
using (public.is_workspace_user(workspace));



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
using (public.is_workspace_user(workspace));



  create policy "Select -> Workspace User"
  on "public"."workspaces"
  as permissive
  for select
  to authenticated
using (public.is_workspace_user(id));


CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


