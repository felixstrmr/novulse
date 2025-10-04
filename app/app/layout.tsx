import AppHeader from "@/components/app/app-header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex size-full flex-col gap-1 bg-muted p-1">
      <AppHeader />
      <div className="flex size-full rounded-lg bg-background">{children}</div>
    </div>
  );
}
