import { Toaster } from "@/components/ui/sonner";
import { Spinner } from "@/components/ui/spinner";

type Props = {
  children: React.ReactNode;
};

export default function RootProvider({ children }: Props) {
  return (
    <>
      {children}
      <Toaster
        icons={{
          loading: <Spinner />,
        }}
      />
    </>
  );
}
