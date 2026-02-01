import { Suspense } from "react";
import Signin from "@/components/signin/signin-page";
import SigninPageSkeleton from "@/components/skeletons/signin-page-skeleton";

export default function SigninPage() {
  return (
    <div className="flex size-full items-center justify-center">
      <Suspense fallback={<SigninPageSkeleton />}>
        <Signin />
      </Suspense>
    </div>
  );
}
