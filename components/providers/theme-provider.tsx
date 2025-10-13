"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type * as React from "react";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextThemesProvider attribute="class" forcedTheme="light">
      {children}
    </NextThemesProvider>
  );
}
