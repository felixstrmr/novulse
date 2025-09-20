CREATE TYPE "public"."project_user_role" AS ENUM('Member', 'Lead');--> statement-breakpoint
ALTER TABLE "project_users" ADD COLUMN "role" "project_user_role" DEFAULT 'Member' NOT NULL;