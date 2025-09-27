ALTER TABLE "project_statuses" ALTER COLUMN "order" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "client_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_client_id_clients_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE restrict ON UPDATE no action;