import { NuqsAdapter } from "nuqs/adapters/next/app";
import ThemeProvider from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Spinner } from "@/components/ui/spinner";

type Props = {
  children: React.ReactNode;
};

export default function RootProvider({ children }: Props) {
  return (
    <ThemeProvider>
      <NuqsAdapter>{children}</NuqsAdapter>
      <Toaster
        icons={{
          loading: <Spinner />,
        }}
      />
    </ThemeProvider>
  );
}
