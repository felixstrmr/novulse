CREATE TYPE "public"."status" AS ENUM('active', 'inactive');--> statement-breakpoint
ALTER TABLE "clients" ADD COLUMN "status" "status" DEFAULT 'active' NOT NULL;