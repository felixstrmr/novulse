export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex size-full flex-col">{children}</div>;
}
