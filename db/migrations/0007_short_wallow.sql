ALTER TABLE "projects" DROP CONSTRAINT "projects_status_id_project_statuses_id_fk";
--> statement-breakpoint
ALTER TABLE "project_statuses" ADD COLUMN "order" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_status_id_project_statuses_id_fk" FOREIGN KEY ("status_id") REFERENCES "public"."project_statuses"("id") ON DELETE restrict ON UPDATE no action;