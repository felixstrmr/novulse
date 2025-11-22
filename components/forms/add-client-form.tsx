"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import { addClientAction } from "@/actions/add-client-action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { addClientSchema } from "@/schemas/add-client-schema";
import { urlProofSlug } from "@/utils/domain";

export default function AddClientForm({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) {
  const router = useRouter();

  const form = useForm<z.infer<typeof addClientSchema>>({
    resolver: zodResolver(addClientSchema),
    defaultValues: {
      name: "",
      slug: "",
      is_active: true,
    },
  });

  const { execute, isExecuting } = useAction(addClientAction, {
    onExecute: () => {
      toast.loading("Adding client...", {
        id: "add-client-form",
      });
    },
    onError: ({ error }) => {
      toast.error(error.serverError, {
        id: "add-client-form",
      });
    },
    onSuccess: ({ data: client }) => {
      toast.success("Client added successfully", {
        id: "add-client-form",
      });
      router.push(`/dashboard/clients/${client.id}`);
      setOpen(false);
    },
  });

  return (
    <div>
      <div className="flex items-center gap-1.5 p-4">
        <p className="text-xs">Clients</p>
        <ArrowRightIcon className="size-3.5 text-muted-foreground" />
        <div className="flex h-7 items-center">
          <Badge className="rounded-sm px-1 text-xs" variant="outline">
            {form.watch("slug") || "New client"}
          </Badge>
        </div>
      </div>
      <form onSubmit={form.handleSubmit(execute)}>
        <FieldGroup className="px-4 pb-4">
          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <input
                  {...field}
                  autoFocus
                  className="font-semibold text-xl tracking-tight focus:outline-none"
                  disabled={isExecuting}
                  id="name"
                  onChange={(e) => {
                    field.onChange(e);
                    form.setValue("slug", urlProofSlug(e.target.value));
                  }}
                  placeholder="Client name"
                  required
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="is_active"
            render={({ field, fieldState }) => {
              const { value, onChange, ...fieldProps } = field;
              return (
                <Field
                  data-invalid={fieldState.invalid}
                  orientation="horizontal"
                >
                  <Checkbox
                    {...fieldProps}
                    checked={value}
                    disabled={isExecuting}
                    id="is_active"
                    onCheckedChange={onChange}
                  />
                  <FieldLabel htmlFor="is_active">Active</FieldLabel>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              );
            }}
          />
        </FieldGroup>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button isLoading={isExecuting} type="submit">
            Add client
          </Button>
        </DialogFooter>
      </form>
    </div>
  );
}
