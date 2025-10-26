import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import {
  CircleAlertIcon,
  CircleCheckIcon,
  CircleXIcon,
  InfoIcon,
} from "lucide-react";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import ThemeProvider from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Spinner } from "@/components/ui/spinner";

export default function RootProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NuqsAdapter>
      <ThemeProvider>
        {children}

        <Toaster
          icons={{
            loading: <Spinner className="size-4" />,
            error: <CircleXIcon className="size-4 text-red-600" />,
            success: <CircleCheckIcon className="size-4 text-green-600" />,
            info: <InfoIcon className="size-4 text-blue-600" />,
            warning: <CircleAlertIcon className="size-4 text-yellow-600" />,
          }}
        />
      </ThemeProvider>
      <Analytics />
      <SpeedInsights />
    </NuqsAdapter>
  );
}
