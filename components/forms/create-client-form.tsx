"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import { createClientAction } from "@/actions/create-client-action";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { createClientSchema } from "@/schemas/create-client-schema";

export default function CreateClientForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof createClientSchema>>({
    resolver: zodResolver(createClientSchema),
    defaultValues: {
      name: "",
      slug: "",
      website: undefined,
      image: undefined,
    },
  });

  const { execute, isExecuting } = useAction(createClientAction, {
    onExecute: () => {
      toast.loading("Creating client...", {
        id: "create-client-form",
      });
    },
    onError: ({ error }) => {
      toast.error(error.serverError, {
        id: "create-client-form",
      });
    },
    onSuccess: () => {
      toast.success("Client created", {
        id: "create-client-form",
      });
      router.push("/dashboard/clients");
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
                <FormControl>
                  <input
                    autoFocus
                    className="font-semibold text-2xl tracking-tight focus:outline-none"
                    placeholder="Client name"
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <input
                  className="focus:outline-none"
                  placeholder="Client slug"
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button isLoading={isExecuting}>Create client</Button>
        </div>
      </form>
    </Form>
  );
}
