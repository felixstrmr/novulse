type Props = {
  params: Promise<{ organization: string; clientSlug: string }>;
};

export default async function page({ params }: Props) {
  const { organization, clientSlug } = await params;

  return (
    <div>
      <h1>{organization}</h1>
      <h1>{clientSlug}</h1>
    </div>
  );
}
