import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Loader2 } from "lucide-react";
import ThemeProvider from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";

type Props = {
  children: React.ReactNode;
};

export default function RootProvider({ children }: Props) {
  return (
    <ThemeProvider>
      {children}
      <Toaster
        icons={{
          loading: <Loader2 className="size-4 animate-spin" />,
        }}
      />
      <Analytics />
      <SpeedInsights />
    </ThemeProvider>
  );
}
