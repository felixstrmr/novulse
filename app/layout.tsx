import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import RootProvider from "@/components/providers/root-provider";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Novulse • Deliver design work faster.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      lang="en"
      suppressHydrationWarning
    >
      <body>
        <RootProvider>
          <main className="h-screen w-screen">{children}</main>
        </RootProvider>
      </body>
    </html>
  );
}
