"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function ThemeProvider(props: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" forcedTheme="light">
      {props.children}
    </NextThemesProvider>
  );
}
