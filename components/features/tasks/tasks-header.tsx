"use client";

import {
  CheckIcon,
  ChevronDownIcon,
  CircleXIcon,
  SearchIcon,
} from "lucide-react";
import { parseAsIsoDate, parseAsString, useQueryStates } from "nuqs";
import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Client } from "@/types";
import { cn } from "@/utils/ui";

export default function TasksHeader({ clients }: { clients: Client[] }) {
  const [isTargetDateOpen, setTargetDateOpen] = useState(false);
  const [isClientOpen, setClientOpen] = useState(false);

  const [filters, setFilters] = useQueryStates({
    client: parseAsString,
    project: parseAsString,
    targetDate: parseAsIsoDate,
  });

  return (
    <div className="flex justify-between">
      <div>
        <div className="relative w-64">
          <SearchIcon className="-translate-y-1/2 absolute top-1/2 left-2 size-4 text-muted-foreground" />
          <Input
            className="bg-background pl-8"
            placeholder="Search tasks..."
            type="search"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Popover onOpenChange={setTargetDateOpen} open={isTargetDateOpen}>
          <PopoverTrigger asChild>
            <Button className="p-0" variant="outline">
              {filters.targetDate && (
                <span className="flex items-center gap-1 pr-1 pl-2">
                  {filters.targetDate.toLocaleDateString()}
                  <div
                    className="pointer-events-auto flex size-6 cursor-pointer items-center justify-center rounded-sm text-muted-foreground hover:bg-foreground/10 hover:text-foreground"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setFilters({
                        ...filters,
                        targetDate: null,
                      });
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        e.stopPropagation();
                        setFilters({
                          ...filters,
                          targetDate: null,
                        });
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <CircleXIcon className="size-4 text-muted-foreground" />
                  </div>
                </span>
              )}
              {!filters.targetDate && (
                <span className="flex items-center gap-1.5 px-2">
                  Target date
                  <ChevronDownIcon className="size-4 opacity-50" />
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-auto overflow-hidden p-0">
            <Calendar
              captionLayout="dropdown"
              mode="single"
              onSelect={(date) => {
                setFilters({
                  ...filters,
                  targetDate: date || null,
                });
                setTargetDateOpen(false);
              }}
              selected={filters.targetDate || undefined}
            />
          </PopoverContent>
        </Popover>
        <Popover onOpenChange={setClientOpen} open={isClientOpen}>
          <PopoverTrigger asChild>
            <Button className="p-0" variant="outline">
              {filters.client && (
                <span className="flex items-center gap-1 pr-1 pl-2">
                  {clients.find((client) => client.id === filters.client)?.name}
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
                </span>
              )}
              {!filters.client && (
                <span className="flex items-center gap-1.5 px-2">
                  Client
                  <ChevronDownIcon className="size-4 opacity-50" />
                </span>
              )}
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
                      onSelect={() => {
                        setFilters({
                          ...filters,
                          client: client.id,
                        });
                        setClientOpen(false);
                      }}
                      value={`${client.name} ${client.id}`}
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
