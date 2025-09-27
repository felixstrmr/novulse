type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return <div className="flex size-full flex-col">{children}</div>;
}
