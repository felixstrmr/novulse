import DashboardSidebar from "@/components/sidebars/dashboard-sidebar";

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="flex size-full gap-1 bg-muted p-1 dark:bg-muted/50">
      <DashboardSidebar />
      {children}
    </div>
  );
}
