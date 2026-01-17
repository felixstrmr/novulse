import { Suspense } from "react";
import HomeTopbar from "@/components/home/home-topbar";
import HomeTopbarSkeleton from "@/components/skeletons/home-topbar-skeleton";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen w-screen">
      <div className="flex size-full flex-col">
        <Suspense fallback={<HomeTopbarSkeleton />}>
          <HomeTopbar />
        </Suspense>

        {children}
      </div>
    </main>
  );
}
