import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { env } from "@/lib/env";

export default function Page() {
  const signinWithGithub = async () => {
    "use server";

    const protocol = env.NODE_ENV === "development" ? "http" : "https";

    const { url } = await auth.api.signInSocial({
      body: {
        provider: "github",
        callbackURL: `${protocol}://app.${env.NEXT_PUBLIC_ROOT_DOMAIN}/`,
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
