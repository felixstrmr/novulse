"use client";

import { CheckIcon, ChevronDownIcon, CircleXIcon } from "lucide-react";
import { parseAsString, useQueryStates } from "nuqs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Client, Project } from "@/types";
import { cn } from "@/utils/ui";

export default function TasksHeader({
  clients,
  projects,
}: {
  clients: Client[];
  projects: Project[];
}) {
  const [isClientOpen, setClientOpen] = useState(false);

  const [filters, setFilters] = useQueryStates({
    client: parseAsString,
    project: parseAsString,
  });

  return (
    <div className="flex justify-between">
      <div>
        <Input className="w-64" placeholder="Search tasks" />
      </div>
      <div className="flex items-center gap-2">
        <Popover onOpenChange={setClientOpen} open={isClientOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline">
              {filters.client && (
                <div
                  className="pointer-events-auto flex size-6 cursor-pointer items-center justify-center rounded-sm text-muted-foreground hover:bg-foreground/10 hover:text-foreground"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setFilters({
                      ...filters,
                      client: null,
                    });
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      e.stopPropagation();
                      setFilters({
                        ...filters,
                        client: null,
                      });
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <CircleXIcon className="size-4 text-muted-foreground" />
                </div>
              )}
              {filters.client
                ? clients.find((client) => client.id === filters.client)?.name
                : "Client"}
              <ChevronDownIcon className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-64 p-0">
            <Command>
              <CommandInput className="h-8" placeholder="Search client..." />
              <CommandList>
                <CommandEmpty>No client found.</CommandEmpty>
                <CommandGroup>
                  {clients.map((client) => (
                    <CommandItem
                      key={client.id}
                      onSelect={(currentValue) => {
                        setFilters({
                          ...filters,
                          client:
                            currentValue === filters.client
                              ? null
                              : currentValue,
                        });
                        setClientOpen(false);
                      }}
                      value={client.id}
                    >
                      {client.name}
                      <CheckIcon
                        className={cn(
                          "ml-auto",
                          filters.client === client.id
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
      </div>
    </div>
  );
}
