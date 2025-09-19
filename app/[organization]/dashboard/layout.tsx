import DashboardSidebar from "@/components/sidebars/dashboard-sidebar";

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="flex size-full gap-1 bg-muted/50 p-1">
      <DashboardSidebar />
      {children}
    </div>
  );
}
