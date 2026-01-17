import Link from "next/link";
import { NovulseIcon } from "@/components/icons";

export default function HomeTopbar() {
  return (
    <nav className="p-3">
      <div className="mx-auto w-full max-w-6xl">
        <Link className="flex items-center gap-2" href="/">
          <NovulseIcon className="size-4.5" />
          <span className="font-semibold text-2xl tracking-tight">Novulse</span>
        </Link>
      </div>
    </nav>
  );
}
