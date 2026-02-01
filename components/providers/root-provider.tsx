import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "@/components/ui/sonner";

export default function RootProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NuqsAdapter>
      {children}
      <Toaster />
    </NuqsAdapter>
  );
}
