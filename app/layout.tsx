import type { Metadata } from "next";
import { Inter } from "next/font/google";
import RootProvider from "@/components/providers/root-provider";

import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Novulse • Deliver design work faster.",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html className={`${inter.className}`} lang="en" suppressHydrationWarning>
      <body>
        <RootProvider>
          <main className="h-screen w-screen">{children}</main>
        </RootProvider>
      </body>
    </html>
  );
}
