CREATE TYPE "public"."task_types" AS ENUM('image');--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "type" "task_types" DEFAULT 'image' NOT NULL;