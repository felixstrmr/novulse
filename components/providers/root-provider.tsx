import { NuqsAdapter } from "nuqs/adapters/next";
import ThemeProvider from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";

export default function RootProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NuqsAdapter>
      <ThemeProvider>
        {children}
        <Toaster />
      </ThemeProvider>
    </NuqsAdapter>
  );
}
