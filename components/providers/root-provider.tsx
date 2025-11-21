import {
  CircleCheckIcon,
  CircleXIcon,
  InfoIcon,
  TriangleAlertIcon,
  XIcon,
} from "lucide-react";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import ThemeProvider from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Spinner } from "@/components/ui/spinner";

export default function RootProvider(props: { children: React.ReactNode }) {
  return (
    <NuqsAdapter>
      <ThemeProvider>
        {props.children}
        <Toaster
          icons={{
            success: <CircleCheckIcon className="size-4 text-green-500" />,
            error: <CircleXIcon className="size-4 text-red-500" />,
            loading: <Spinner className="size-4" />,
            info: <InfoIcon className="size-4 text-blue-500" />,
            warning: <TriangleAlertIcon className="size-4 text-yellow-500" />,
            close: <XIcon className="size-4 text-zinc-500" />,
          }}
        />      </ThemeProvider>
    </NuqsAdapter>
  );
}
