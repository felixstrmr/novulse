"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ArrowRightIcon, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import { createProjectAction } from "@/actions/create-project-action";
import ProjectPriorityIcon from "@/components/icons/dynamic/project-priority-icon";
import ProjectStatusIcon from "@/components/icons/dynamic/project-status-icon";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PROJECT_PRIORITIES, PROJECT_STATUSES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { createProjectSchema } from "@/schemas/create-project-schema";
import type { Client } from "@/types";

type Props = {
  defaultStatus?: (typeof PROJECT_STATUSES)[number];
  clients: Client[];
};

export default function CreateProjectForm({ defaultStatus, clients }: Props) {
  const router = useRouter();

  const [clientPopoverOpen, setClientPopoverOpen] = React.useState(false);
  const [startDatePopoverOpen, setStartDatePopoverOpen] = React.useState(false);
  const [endDatePopoverOpen, setEndDatePopoverOpen] = React.useState(false);

  const form = useForm<z.infer<typeof createProjectSchema>>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      clientId: undefined,
      name: "",
      status: defaultStatus || "Not Started",
      priority: undefined,
      description: "",
      startDate: undefined,
      endDate: undefined,
    },
  });

  const { execute, isExecuting } = useAction(createProjectAction, {
    onExecute: () => {
      toast.loading("Creating project...", {
        id: "create-project-form",
      });
    },
    onError: ({ error }) => {
      toast.error(error.serverError, {
        id: "create-project-form",
      });
    },
    onSuccess: ({ data }) => {
      toast.success("Project created", {
        id: "create-project-form",
      });
      router.push(`/dashboard/projects/${data.id}`);
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(execute)}>
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input
                    autoFocus
                    className="font-semibold text-2xl tracking-tight focus:outline-none"
                    placeholder="Project name"
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input
                    className="focus:outline-none"
                    placeholder="Add a description..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger className="bg-muted shadow-none" size="sm">
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {PROJECT_STATUSES.map((status) => (
                      <SelectItem
                        className="text-xs"
                        key={status}
                        value={status}
                      >
                        <ProjectStatusIcon
                          className="size-3.5"
                          status={status}
                        />
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger className="bg-muted shadow-none" size="sm">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {PROJECT_PRIORITIES.map((priority) => (
                      <SelectItem
                        className="text-xs"
                        key={priority}
                        value={priority}
                      >
                        <ProjectPriorityIcon
                          className="size-3.5"
                          priority={priority}
                        />
                        {priority}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="clientId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Popover
                  onOpenChange={setClientPopoverOpen}
                  open={clientPopoverOpen}
                >
                  <PopoverTrigger asChild>
                    <FormControl>
                      <button
                        className={cn(
                          "h-7 cursor-pointer items-center rounded-md bg-input/30 px-2 text-xs transition-colors hover:bg-input/50",
                          field.value
                            ? "text-foreground"
                            : "text-muted-foreground"
                        )}
                        type="button"
                      >
                        {field.value
                          ? clients.find((client) => client.id === field.value)
                              ?.name
                          : "Client"}
                      </button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-48 p-0">
                    <Command>
                      <CommandInput
                        className="h-7"
                        placeholder="Search client..."
                      />
                      <CommandList>
                        <CommandEmpty>No client found.</CommandEmpty>
                        <CommandGroup>
                          {clients.map((client) => (
                            <CommandItem
                              key={client.id}
                              onSelect={() => {
                                form.setValue("clientId", client.id);
                                setClientPopoverOpen(false);
                              }}
                              value={client.name}
                            >
                              {client.name}
                              <Check
                                className={cn(
                                  "ml-auto size-3.5",
                                  client.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-2">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Popover
                    onOpenChange={setStartDatePopoverOpen}
                    open={startDatePopoverOpen}
                  >
                    <PopoverTrigger asChild>
                      <FormControl>
                        <button
                          className={cn(
                            "h-7 cursor-pointer rounded-md bg-input/30 px-2 text-xs hover:bg-input/50",
                            !field.value && "text-muted-foreground"
                          )}
                          type="button"
                        >
                          {field.value ? (
                            format(field.value, "PP")
                          ) : (
                            <span>Start date</span>
                          )}
                        </button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="w-auto p-0">
                      <Calendar
                        captionLayout="label"
                        mode="single"
                        onSelect={(date) => {
                          field.onChange(date);
                          setStartDatePopoverOpen(false);
                        }}
                        selected={field.value}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ArrowRightIcon className="size-3.5" />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Popover
                    onOpenChange={setEndDatePopoverOpen}
                    open={endDatePopoverOpen}
                  >
                    <PopoverTrigger asChild>
                      <FormControl>
                        <button
                          className={cn(
                            "h-7 cursor-pointer rounded-md bg-input/30 px-2 text-xs hover:bg-input/50",
                            !field.value && "text-muted-foreground"
                          )}
                          type="button"
                        >
                          {field.value ? (
                            format(field.value, "PP")
                          ) : (
                            <span>End date</span>
                          )}
                        </button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      align="start"
                      className="w-auto p-0"
                      onCloseAutoFocus={(e) => e.preventDefault()}
                    >
                      <Calendar
                        captionLayout="label"
                        mode="single"
                        onSelect={(date) => {
                          field.onChange(date);
                          setEndDatePopoverOpen(false);
                        }}
                        selected={field.value}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button isLoading={isExecuting}>Create project</Button>
        </div>
      </form>
    </Form>
  );
}
