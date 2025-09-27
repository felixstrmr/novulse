import DashboardHeader from "@/components/workspace/dashboard/dashboard-header";
import SettingsSidebar from "@/components/workspace/settings/settings-sidebar";

type Props = {
  children: React.ReactNode;
};

export default function SettingsLayout({ children }: Props) {
  return (
    <div className="absolute inset-0 flex size-full gap-1 bg-muted p-1">
      <SettingsSidebar />
      <div className="flex size-full flex-col gap-1">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
}
