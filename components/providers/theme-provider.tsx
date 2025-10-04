"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type * as React from "react";

type Props = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  return (
    <NextThemesProvider attribute="class" forcedTheme="light">
      {children}
    </NextThemesProvider>
  );
}
