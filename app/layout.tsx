import { Inter } from "next/font/google";
import type { Metadata } from "next/types";
import RootProvider from "@/components/providers/root-provider";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Novulse",
  description: "",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <RootProvider>
          <main className="h-screen w-screen"> {children}</main>
        </RootProvider>
      </body>
    </html>
  );
}
