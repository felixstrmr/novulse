type Props = {
  title: string;
  description: string;
  icon: React.ElementType;
  button?: React.ReactNode;
};

export default function EmptyState({
  title,
  description,
  icon: Icon,
  button,
}: Props) {
  return (
    <div className="flex size-full flex-col items-center justify-center">
      <div className="rounded-full border border-dashed p-2">
        <div className="rounded-full border bg-background p-4 shadow-sm">
          <Icon className="size-8 text-muted-foreground" />
        </div>
      </div>
      <h1 className="mt-4 font-semibold text-2xl tracking-tight">{title}</h1>
      <p className="mt-1 text-muted-foreground text-sm">{description}</p>
      {button && <div className="mt-6">{button}</div>}
    </div>
  );
}
