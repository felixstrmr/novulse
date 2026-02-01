import { Toaster } from "@/components/ui/sonner";

export default function RootProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
