export default function TaskLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="absolute inset-0 flex size-full bg-muted p-1">
      {children}
    </div>
  );
}
