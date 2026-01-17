


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "hypopg" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "index_advisor" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."asset_types" AS ENUM (
    'hardware',
    'software',
    'license',
    'consumable',
    'component',
    'accessory',
    'virtual',
    'cloud_service',
    'network_device',
    'mobile_device'
);


ALTER TYPE "public"."asset_types" OWNER TO "postgres";


CREATE TYPE "public"."workspace_user_roles" AS ENUM (
    'owner',
    'administrator',
    'agent',
    'customer'
);


ALTER TYPE "public"."workspace_user_roles" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
begin
  insert into public.users (id, email, avatar, first_name, last_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'avatar', new.raw_user_meta_data ->> 'first_name', new.raw_user_meta_data ->> 'last_name');
  return new;
end;
$$;


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."is_workspace_administrator"("workspace_id" "uuid", "user_id" "uuid" DEFAULT "auth"."uid"()) RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.workspace_users
    WHERE workspace_users.workspace = workspace_id
      AND workspace_users.user = user_id
      AND (workspace_users.role = 'owner' OR workspace_users.role = 'administrator')
  );
END;$$;


ALTER FUNCTION "public"."is_workspace_administrator"("workspace_id" "uuid", "user_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."is_workspace_agent"("workspace_id" "uuid", "user_id" "uuid" DEFAULT "auth"."uid"()) RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.workspace_users
    WHERE workspace_users.workspace = workspace_id
      AND workspace_users.user = user_id
      AND (workspace_users.role = 'owner' OR workspace_users.role = 'administrator' OR workspace_users.role = 'agent')
  );
END;$$;


ALTER FUNCTION "public"."is_workspace_agent"("workspace_id" "uuid", "user_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."is_workspace_customer"("workspace_id" "uuid", "user_id" "uuid" DEFAULT "auth"."uid"()) RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.workspace_users
    WHERE workspace_users.workspace = workspace_id
      AND workspace_users.user = user_id
      AND workspace_users.role = 'customer'
  );
END;$$;


ALTER FUNCTION "public"."is_workspace_customer"("workspace_id" "uuid", "user_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."is_workspace_owner"("workspace_id" "uuid", "user_id" "uuid" DEFAULT "auth"."uid"()) RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.workspace_users
    WHERE workspace_users.workspace = workspace_id
      AND workspace_users.user = user_id
      AND workspace_users.role = 'owner'
  );
END;$$;


ALTER FUNCTION "public"."is_workspace_owner"("workspace_id" "uuid", "user_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."is_workspace_user"("workspace_id" "uuid", "user_id" "uuid" DEFAULT "auth"."uid"()) RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.workspace_users
    WHERE workspace_users.workspace = workspace_id
      AND workspace_users.user = user_id
  );
END;$$;


ALTER FUNCTION "public"."is_workspace_user"("workspace_id" "uuid", "user_id" "uuid") OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."asset_categories" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "workspace" "uuid" NOT NULL,
    "name" "text" NOT NULL,
    "type" "public"."asset_types" NOT NULL
);


ALTER TABLE "public"."asset_categories" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."asset_locations" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "workspace" "uuid" NOT NULL,
    "name" "text" NOT NULL,
    "parent_location" "uuid"
);


ALTER TABLE "public"."asset_locations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."asset_manufacturers" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "workspace" "uuid" NOT NULL,
    "name" "text" NOT NULL,
    "icon" "text"
);


ALTER TABLE "public"."asset_manufacturers" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."asset_models" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "workspace" "uuid" NOT NULL,
    "name" "text" NOT NULL,
    "manufacturer" "uuid" NOT NULL
);


ALTER TABLE "public"."asset_models" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."asset_relation_types" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "workspace" "uuid" NOT NULL,
    "name" "text" NOT NULL
);


ALTER TABLE "public"."asset_relation_types" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."asset_relations" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "workspace" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "parent_asset" "uuid" NOT NULL,
    "child_asset" "uuid" NOT NULL,
    "type" "uuid" NOT NULL
);


ALTER TABLE "public"."asset_relations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."asset_statuses" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "workspace" "uuid" NOT NULL,
    "name" "text" NOT NULL,
    "color" "text" DEFAULT ''::"text" NOT NULL,
    "icon" "text" NOT NULL,
    "is_default" boolean NOT NULL,
    "order" numeric NOT NULL
);


ALTER TABLE "public"."asset_statuses" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."asset_updates" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "workspace" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "asset" "uuid" NOT NULL
);


ALTER TABLE "public"."asset_updates" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."assets" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "workspace" "uuid" NOT NULL,
    "status" "uuid" NOT NULL,
    "category" "uuid" NOT NULL,
    "name" "text" NOT NULL,
    "description" "text",
    "type" "public"."asset_types" NOT NULL,
    "manufacturer" "uuid",
    "model" "uuid",
    "assigned_to" "uuid",
    "location" "uuid",
    "updated_at" timestamp with time zone
);


ALTER TABLE "public"."assets" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."users" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "email" "text" NOT NULL,
    "avatar" "text",
    "first_name" "text",
    "last_name" "text"
);


ALTER TABLE "public"."users" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."workspace_users" (
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "workspace" "uuid" NOT NULL,
    "user" "uuid" NOT NULL,
    "role" "public"."workspace_user_roles" DEFAULT 'customer'::"public"."workspace_user_roles" NOT NULL
);


ALTER TABLE "public"."workspace_users" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."workspaces" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" "text" NOT NULL,
    "domain" "text" NOT NULL,
    "settings" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL
);


ALTER TABLE "public"."workspaces" OWNER TO "postgres";


ALTER TABLE ONLY "public"."asset_locations"
    ADD CONSTRAINT "asset_locations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."asset_manufacturers"
    ADD CONSTRAINT "asset_manufacturers_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."asset_models"
    ADD CONSTRAINT "asset_models_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."asset_relation_types"
    ADD CONSTRAINT "asset_relationship_types_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."asset_relations"
    ADD CONSTRAINT "asset_relationships_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."asset_statuses"
    ADD CONSTRAINT "asset_statuses_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."asset_categories"
    ADD CONSTRAINT "asset_types_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."asset_updates"
    ADD CONSTRAINT "asset_updates_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."assets"
    ADD CONSTRAINT "assets_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_email_key" UNIQUE ("email");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."workspace_users"
    ADD CONSTRAINT "workspace_users_pkey" PRIMARY KEY ("workspace", "user");



ALTER TABLE ONLY "public"."workspaces"
    ADD CONSTRAINT "workspaces_domain_key" UNIQUE ("domain");



ALTER TABLE ONLY "public"."workspaces"
    ADD CONSTRAINT "workspaces_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."asset_locations"
    ADD CONSTRAINT "asset_locations_parent_location_fkey" FOREIGN KEY ("parent_location") REFERENCES "public"."asset_locations"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."asset_locations"
    ADD CONSTRAINT "asset_locations_workspace_fkey" FOREIGN KEY ("workspace") REFERENCES "public"."workspaces"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."asset_manufacturers"
    ADD CONSTRAINT "asset_manufacturers_workspace_fkey" FOREIGN KEY ("workspace") REFERENCES "public"."workspaces"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."asset_models"
    ADD CONSTRAINT "asset_models_manufacturer_fkey" FOREIGN KEY ("manufacturer") REFERENCES "public"."asset_manufacturers"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."asset_models"
    ADD CONSTRAINT "asset_models_workspace_fkey" FOREIGN KEY ("workspace") REFERENCES "public"."workspaces"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."asset_relation_types"
    ADD CONSTRAINT "asset_relation_types_workspace_fkey" FOREIGN KEY ("workspace") REFERENCES "public"."workspaces"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."asset_relations"
    ADD CONSTRAINT "asset_relations_child_asset_fkey" FOREIGN KEY ("child_asset") REFERENCES "public"."assets"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."asset_relations"
    ADD CONSTRAINT "asset_relations_parent_asset_fkey" FOREIGN KEY ("parent_asset") REFERENCES "public"."assets"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."asset_relations"
    ADD CONSTRAINT "asset_relations_type_fkey" FOREIGN KEY ("type") REFERENCES "public"."asset_relation_types"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."asset_relations"
    ADD CONSTRAINT "asset_relations_workspace_fkey" FOREIGN KEY ("workspace") REFERENCES "public"."workspaces"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."asset_statuses"
    ADD CONSTRAINT "asset_statuses_workspace_fkey" FOREIGN KEY ("workspace") REFERENCES "public"."workspaces"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."asset_categories"
    ADD CONSTRAINT "asset_types_workspace_fkey" FOREIGN KEY ("workspace") REFERENCES "public"."workspaces"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."asset_updates"
    ADD CONSTRAINT "asset_updates_asset_fkey" FOREIGN KEY ("asset") REFERENCES "public"."assets"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."asset_updates"
    ADD CONSTRAINT "asset_updates_workspace_fkey" FOREIGN KEY ("workspace") REFERENCES "public"."workspaces"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."assets"
    ADD CONSTRAINT "assets_assigned_to_fkey" FOREIGN KEY ("assigned_to") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."assets"
    ADD CONSTRAINT "assets_category_fkey" FOREIGN KEY ("category") REFERENCES "public"."asset_categories"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."assets"
    ADD CONSTRAINT "assets_location_fkey" FOREIGN KEY ("location") REFERENCES "public"."asset_locations"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."assets"
    ADD CONSTRAINT "assets_manufacturer_fkey" FOREIGN KEY ("manufacturer") REFERENCES "public"."asset_manufacturers"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."assets"
    ADD CONSTRAINT "assets_model_fkey" FOREIGN KEY ("model") REFERENCES "public"."asset_models"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."assets"
    ADD CONSTRAINT "assets_status_fkey" FOREIGN KEY ("status") REFERENCES "public"."asset_statuses"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."assets"
    ADD CONSTRAINT "assets_workspace_fkey" FOREIGN KEY ("workspace") REFERENCES "public"."workspaces"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."workspace_users"
    ADD CONSTRAINT "workspace_users_user_fkey" FOREIGN KEY ("user") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."workspace_users"
    ADD CONSTRAINT "workspace_users_workspace_fkey" FOREIGN KEY ("workspace") REFERENCES "public"."workspaces"("id") ON UPDATE CASCADE ON DELETE CASCADE;



CREATE POLICY "Insert -> Workspace Agent" ON "public"."assets" FOR INSERT TO "authenticated" WITH CHECK ("public"."is_workspace_agent"("workspace"));



CREATE POLICY "Select -> Authenticated" ON "public"."users" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "Select -> Workspace User" ON "public"."asset_categories" FOR SELECT TO "authenticated" USING ("public"."is_workspace_user"("workspace"));



CREATE POLICY "Select -> Workspace User" ON "public"."asset_locations" FOR SELECT TO "authenticated" USING ("public"."is_workspace_user"("workspace"));



CREATE POLICY "Select -> Workspace User" ON "public"."asset_manufacturers" FOR SELECT TO "authenticated" USING ("public"."is_workspace_user"("workspace"));



CREATE POLICY "Select -> Workspace User" ON "public"."asset_models" FOR SELECT TO "authenticated" USING ("public"."is_workspace_user"("workspace"));



CREATE POLICY "Select -> Workspace User" ON "public"."asset_relation_types" FOR SELECT TO "authenticated" USING ("public"."is_workspace_user"("workspace"));



CREATE POLICY "Select -> Workspace User" ON "public"."asset_relations" FOR SELECT TO "authenticated" USING ("public"."is_workspace_user"("workspace"));



CREATE POLICY "Select -> Workspace User" ON "public"."asset_statuses" FOR SELECT TO "authenticated" USING ("public"."is_workspace_user"("workspace"));



CREATE POLICY "Select -> Workspace User" ON "public"."asset_updates" FOR SELECT TO "authenticated" USING ("public"."is_workspace_user"("workspace"));



CREATE POLICY "Select -> Workspace User" ON "public"."assets" FOR SELECT TO "authenticated" USING ("public"."is_workspace_user"("workspace"));



CREATE POLICY "Select -> Workspace User" ON "public"."workspace_users" FOR SELECT TO "authenticated" USING ("public"."is_workspace_user"("workspace"));



CREATE POLICY "Select -> Workspace User" ON "public"."workspaces" FOR SELECT TO "authenticated" USING ("public"."is_workspace_user"("id"));



ALTER TABLE "public"."asset_categories" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."asset_locations" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."asset_manufacturers" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."asset_models" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."asset_relation_types" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."asset_relations" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."asset_statuses" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."asset_updates" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."assets" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."users" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."workspace_users" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."workspaces" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";





























































































































































































GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";



GRANT ALL ON FUNCTION "public"."is_workspace_administrator"("workspace_id" "uuid", "user_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."is_workspace_administrator"("workspace_id" "uuid", "user_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_workspace_administrator"("workspace_id" "uuid", "user_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."is_workspace_agent"("workspace_id" "uuid", "user_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."is_workspace_agent"("workspace_id" "uuid", "user_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_workspace_agent"("workspace_id" "uuid", "user_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."is_workspace_customer"("workspace_id" "uuid", "user_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."is_workspace_customer"("workspace_id" "uuid", "user_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_workspace_customer"("workspace_id" "uuid", "user_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."is_workspace_owner"("workspace_id" "uuid", "user_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."is_workspace_owner"("workspace_id" "uuid", "user_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_workspace_owner"("workspace_id" "uuid", "user_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."is_workspace_user"("workspace_id" "uuid", "user_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."is_workspace_user"("workspace_id" "uuid", "user_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_workspace_user"("workspace_id" "uuid", "user_id" "uuid") TO "service_role";
























GRANT ALL ON TABLE "public"."asset_categories" TO "anon";
GRANT ALL ON TABLE "public"."asset_categories" TO "authenticated";
GRANT ALL ON TABLE "public"."asset_categories" TO "service_role";



GRANT ALL ON TABLE "public"."asset_locations" TO "anon";
GRANT ALL ON TABLE "public"."asset_locations" TO "authenticated";
GRANT ALL ON TABLE "public"."asset_locations" TO "service_role";



GRANT ALL ON TABLE "public"."asset_manufacturers" TO "anon";
GRANT ALL ON TABLE "public"."asset_manufacturers" TO "authenticated";
GRANT ALL ON TABLE "public"."asset_manufacturers" TO "service_role";



GRANT ALL ON TABLE "public"."asset_models" TO "anon";
GRANT ALL ON TABLE "public"."asset_models" TO "authenticated";
GRANT ALL ON TABLE "public"."asset_models" TO "service_role";



GRANT ALL ON TABLE "public"."asset_relation_types" TO "anon";
GRANT ALL ON TABLE "public"."asset_relation_types" TO "authenticated";
GRANT ALL ON TABLE "public"."asset_relation_types" TO "service_role";



GRANT ALL ON TABLE "public"."asset_relations" TO "anon";
GRANT ALL ON TABLE "public"."asset_relations" TO "authenticated";
GRANT ALL ON TABLE "public"."asset_relations" TO "service_role";



GRANT ALL ON TABLE "public"."asset_statuses" TO "anon";
GRANT ALL ON TABLE "public"."asset_statuses" TO "authenticated";
GRANT ALL ON TABLE "public"."asset_statuses" TO "service_role";



GRANT ALL ON TABLE "public"."asset_updates" TO "anon";
GRANT ALL ON TABLE "public"."asset_updates" TO "authenticated";
GRANT ALL ON TABLE "public"."asset_updates" TO "service_role";



GRANT ALL ON TABLE "public"."assets" TO "anon";
GRANT ALL ON TABLE "public"."assets" TO "authenticated";
GRANT ALL ON TABLE "public"."assets" TO "service_role";



GRANT ALL ON TABLE "public"."users" TO "anon";
GRANT ALL ON TABLE "public"."users" TO "authenticated";
GRANT ALL ON TABLE "public"."users" TO "service_role";



GRANT ALL ON TABLE "public"."workspace_users" TO "anon";
GRANT ALL ON TABLE "public"."workspace_users" TO "authenticated";
GRANT ALL ON TABLE "public"."workspace_users" TO "service_role";



GRANT ALL ON TABLE "public"."workspaces" TO "anon";
GRANT ALL ON TABLE "public"."workspaces" TO "authenticated";
GRANT ALL ON TABLE "public"."workspaces" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";































drop extension if exists "pg_net";

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


