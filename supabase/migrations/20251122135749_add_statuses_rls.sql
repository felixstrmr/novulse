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

grant delete on table "public"."client_files" to "postgres";

grant insert on table "public"."client_files" to "postgres";

grant references on table "public"."client_files" to "postgres";

grant select on table "public"."client_files" to "postgres";

grant trigger on table "public"."client_files" to "postgres";

grant truncate on table "public"."client_files" to "postgres";

grant update on table "public"."client_files" to "postgres";

grant delete on table "public"."client_users" to "postgres";

grant insert on table "public"."client_users" to "postgres";

grant references on table "public"."client_users" to "postgres";

grant select on table "public"."client_users" to "postgres";

grant trigger on table "public"."client_users" to "postgres";

grant truncate on table "public"."client_users" to "postgres";

grant update on table "public"."client_users" to "postgres";

grant delete on table "public"."clients" to "postgres";

grant insert on table "public"."clients" to "postgres";

grant references on table "public"."clients" to "postgres";

grant select on table "public"."clients" to "postgres";

grant trigger on table "public"."clients" to "postgres";

grant truncate on table "public"."clients" to "postgres";

grant update on table "public"."clients" to "postgres";

grant delete on table "public"."file_folders" to "postgres";

grant insert on table "public"."file_folders" to "postgres";

grant references on table "public"."file_folders" to "postgres";

grant select on table "public"."file_folders" to "postgres";

grant trigger on table "public"."file_folders" to "postgres";

grant truncate on table "public"."file_folders" to "postgres";

grant update on table "public"."file_folders" to "postgres";

grant delete on table "public"."files" to "postgres";

grant insert on table "public"."files" to "postgres";

grant references on table "public"."files" to "postgres";

grant select on table "public"."files" to "postgres";

grant trigger on table "public"."files" to "postgres";

grant truncate on table "public"."files" to "postgres";

grant update on table "public"."files" to "postgres";

grant delete on table "public"."project_statuses" to "postgres";

grant insert on table "public"."project_statuses" to "postgres";

grant references on table "public"."project_statuses" to "postgres";

grant select on table "public"."project_statuses" to "postgres";

grant trigger on table "public"."project_statuses" to "postgres";

grant truncate on table "public"."project_statuses" to "postgres";

grant update on table "public"."project_statuses" to "postgres";

grant delete on table "public"."projects" to "postgres";

grant insert on table "public"."projects" to "postgres";

grant references on table "public"."projects" to "postgres";

grant select on table "public"."projects" to "postgres";

grant trigger on table "public"."projects" to "postgres";

grant truncate on table "public"."projects" to "postgres";

grant update on table "public"."projects" to "postgres";

grant delete on table "public"."task_statuses" to "postgres";

grant insert on table "public"."task_statuses" to "postgres";

grant references on table "public"."task_statuses" to "postgres";

grant select on table "public"."task_statuses" to "postgres";

grant trigger on table "public"."task_statuses" to "postgres";

grant truncate on table "public"."task_statuses" to "postgres";

grant update on table "public"."task_statuses" to "postgres";

grant delete on table "public"."tasks" to "postgres";

grant insert on table "public"."tasks" to "postgres";

grant references on table "public"."tasks" to "postgres";

grant select on table "public"."tasks" to "postgres";

grant trigger on table "public"."tasks" to "postgres";

grant truncate on table "public"."tasks" to "postgres";

grant update on table "public"."tasks" to "postgres";

grant delete on table "public"."users" to "postgres";

grant insert on table "public"."users" to "postgres";

grant references on table "public"."users" to "postgres";

grant select on table "public"."users" to "postgres";

grant trigger on table "public"."users" to "postgres";

grant truncate on table "public"."users" to "postgres";

grant update on table "public"."users" to "postgres";

grant delete on table "public"."workspace_users" to "postgres";

grant insert on table "public"."workspace_users" to "postgres";

grant references on table "public"."workspace_users" to "postgres";

grant select on table "public"."workspace_users" to "postgres";

grant trigger on table "public"."workspace_users" to "postgres";

grant truncate on table "public"."workspace_users" to "postgres";

grant update on table "public"."workspace_users" to "postgres";

grant delete on table "public"."workspaces" to "postgres";

grant insert on table "public"."workspaces" to "postgres";

grant references on table "public"."workspaces" to "postgres";

grant select on table "public"."workspaces" to "postgres";

grant trigger on table "public"."workspaces" to "postgres";

grant truncate on table "public"."workspaces" to "postgres";

grant update on table "public"."workspaces" to "postgres";


  create policy "Delete -> Workspace Manager"
  on "public"."project_statuses"
  as permissive
  for delete
  to authenticated
using (public.is_workspace_manager(workspace, ( SELECT auth.uid() AS uid)));



  create policy "Insert -> Workspace Manager"
  on "public"."project_statuses"
  as permissive
  for insert
  to authenticated
with check (public.is_workspace_manager(workspace, ( SELECT auth.uid() AS uid)));



  create policy "Update -> Workspace Manager"
  on "public"."project_statuses"
  as permissive
  for update
  to authenticated
using (public.is_workspace_manager(workspace, ( SELECT auth.uid() AS uid)));



  create policy "Delete -> Workspace Manager"
  on "public"."task_statuses"
  as permissive
  for delete
  to authenticated
using (public.is_workspace_manager(workspace, ( SELECT auth.uid() AS uid)));



  create policy "Insert -> Workspace Manager"
  on "public"."task_statuses"
  as permissive
  for insert
  to authenticated
with check (public.is_workspace_manager(workspace, ( SELECT auth.uid() AS uid)));



  create policy "Update -> Workspace Manager"
  on "public"."task_statuses"
  as permissive
  for update
  to authenticated
using (public.is_workspace_manager(workspace, ( SELECT auth.uid() AS uid)));



