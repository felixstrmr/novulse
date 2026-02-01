export default function CreateTemplateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 flex size-full bg-muted p-1">{children}</div>
  );
}
