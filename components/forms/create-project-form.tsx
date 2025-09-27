"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import { createProjectAction } from "@/actions/create-project-action";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createProjectSchema } from "@/schemas/create-project-schema";
import type { Client, ProjectStatus } from "@/types";

export default function CreateProjectForm({
  clients,
  projectStatuses,
}: {
  clients: Client[];
  projectStatuses: ProjectStatus[];
}) {
  const router = useRouter();

  const form = useForm<z.infer<typeof createProjectSchema>>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
      description: "",
      startDate: undefined,
      targetDate: undefined,
      priority: "",
      clientId: "",
      statusId: projectStatuses[0].id,
    },
  });

  const { execute, isExecuting } = useAction(createProjectAction, {
    onExecute: () => {
      toast.loading("Creating project...", {
        id: "create-project-form",
      });
    },
    onSuccess: ({ data }) => {
      toast.success("Project created successfully", {
        id: "create-project-form",
      });
      router.push(`/dashboard/projects/${data.id}`);
    },
    onError: ({ error }) => {
      toast.error(error.serverError, {
        id: "create-project-form",
      });
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(execute)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Project name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="clientId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client</FormLabel>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a client" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button isLoading={isExecuting}>Create project</Button>
      </form>
    </Form>
  );
}
