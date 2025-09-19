type Props = {
  children: React.ReactNode;
};

export default function PortalLayout({ children }: Props) {
  return <div className="flex size-full flex-col">{children}</div>;
}
