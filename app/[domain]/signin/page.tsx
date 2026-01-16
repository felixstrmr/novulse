import { Suspense } from "react";
import Signin from "@/components/signin/signin-page";
import SigninPageSkeleton from "@/components/skeletons/signin-page-skeletont";

export default function SigninPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  return (
    <div className="flex size-full items-center justify-center">
      <Suspense fallback={<SigninPageSkeleton />}>
        <Signin params={params} />
      </Suspense>
    </div>
  );
}
