"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import { signinAction } from "@/actions/signin-action";
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
import PasswordInput from "@/components/ui/input/password";
import { signinSchema } from "@/schemas/signin-schema";

export default function SigninForm({ redirectTo }: { redirectTo: string }) {
  const router = useRouter();

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
      router.push(redirectTo);
    },
  });

  return (
    <Form {...form}>
      <form className="w-64 space-y-8" onSubmit={form.handleSubmit(execute)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    autoFocus
                    disabled={isExecuting}
                    placeholder="email@novulse.com"
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    disabled={isExecuting}
                    placeholder="••••••••••••"
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full" isLoading={isExecuting}>
          Sign in
        </Button>
      </form>
    </Form>
  );
}
