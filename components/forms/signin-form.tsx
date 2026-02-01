"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import { signinAction } from "@/actions/signin-action";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signinSchema } from "@/schemas/signin-schema";

export default function SigninForm() {
  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { execute, isExecuting } = useAction(signinAction, {
    onExecute: () => {
      toast.loading("Signing in...", {
        id: "signin-form",
      });
    },
    onError: ({ error }) => {
      toast.error(error.serverError, {
        id: "signin-form",
      });
    },
    onSuccess: () => {
      toast.success("Signed in successfully", {
        id: "signin-form",
      });
    },
  });

  return (
    <form className="w-64" onSubmit={form.handleSubmit(execute)}>
      <FieldGroup>
        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                {...field}
                autoFocus
                disabled={isExecuting}
                id="email"
                placeholder="email@example.com"
                required
                type="email"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                {...field}
                disabled={isExecuting}
                id="password"
                placeholder="••••••••••••"
                required
                type="password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Field className="mt-4">
          <Button isLoading={isExecuting} type="submit">
            Sign in
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
