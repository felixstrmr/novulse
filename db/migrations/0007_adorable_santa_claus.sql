CREATE TABLE "tasks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"organization_id" uuid NOT NULL,
	"project_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "project_users" ALTER COLUMN "role" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "project_users" ALTER COLUMN "role" SET DEFAULT 'Member'::text;--> statement-breakpoint
DROP TYPE "public"."project_user_role";--> statement-breakpoint
CREATE TYPE "public"."project_user_role" AS ENUM('Member', 'Lead');--> statement-breakpoint
ALTER TABLE "project_users" ALTER COLUMN "role" SET DEFAULT 'Member'::"public"."project_user_role";--> statement-breakpoint
ALTER TABLE "project_users" ALTER COLUMN "role" SET DATA TYPE "public"."project_user_role" USING "role"::"public"."project_user_role";--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;