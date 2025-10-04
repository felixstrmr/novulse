import type { Metadata } from "next";
import { Inter } from "next/font/google";
import RootProvider from "@/components/providers/root-provider";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Novulse • Deliver design work faster.",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html className={`${inter.variable}`} lang="en" suppressHydrationWarning>
      <body>
        <RootProvider>
          <main className="h-screen w-screen">{children}</main>
        </RootProvider>
      </body>
    </html>
  );
}
