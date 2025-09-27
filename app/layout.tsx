import type { Metadata } from "next";
import { Inter } from "next/font/google";
import RootProvider from "@/components/providers/root-provider";

export const metadata: Metadata = {
  title: "Novulse • Deliver design work faster.",
};

import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
