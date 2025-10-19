import {
  CircleAlertIcon,
  CircleCheckIcon,
  CircleXIcon,
  InfoIcon,
} from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { Spinner } from "@/components/ui/spinner";

export default function RootProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Toaster
        icons={{
          loading: <Spinner className="size-4" />,
          error: <CircleXIcon className="size-4 text-red-600" />,
          success: <CircleCheckIcon className="size-4 text-green-600" />,
          info: <InfoIcon className="size-4 text-blue-600" />,
          warning: <CircleAlertIcon className="size-4 text-yellow-600" />,
        }}
      />
    </>
  );
}
