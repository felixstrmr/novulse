import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { protocol } from "@/utils";

export default async function Page({
  params,
}: {
  params: Promise<{ workspace: string }>;
}) {
  const { workspace } = await params;

  const signinWithGithub = async () => {
    "use server";

    const { url } = await auth.api.signInSocial({
      body: {
        provider: "github",
        callbackURL: `${protocol}://${workspace}/dashboard`,
      },
      headers: await headers(),
    });

    if (url) {
      redirect(url);
    }
  };

  return (
    <div className="flex size-full items-center justify-center">
      <Button onClick={signinWithGithub}>Sign in with Github</Button>
    </div>
  );
}
