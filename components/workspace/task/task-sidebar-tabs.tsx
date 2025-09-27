"use client";

import { useQueryState } from "nuqs";
import { cn } from "@/utils";

export default function TaskSidebarTabs() {
  const [tab, setTab] = useQueryState("tab", { defaultValue: "overview" });

  const items = ["overview", "comments", "versions"];

  return (
    <div className="flex border-b px-3 pt-3">
      {items.map((item) => (
        <div className="flex flex-col gap-1" key={item}>
          <button
            className="flex h-7 cursor-pointer items-center rounded-md px-2 hover:bg-muted"
            key={item}
            onClick={() => setTab(item)}
            type="button"
          >
            <p
              className={cn(
                "text-sm capitalize",
                tab === item ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {item}
            </p>
          </button>
          <div
            className={cn(
              "h-px w-full",
              tab === item ? "bg-primary" : "bg-transparent"
            )}
          />
        </div>
      ))}
    </div>
  );
}
