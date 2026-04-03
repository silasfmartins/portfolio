"use client";

import type { ReactNode } from "react";
import { BackToTop } from "@/components/BackToTop";
import { Toaster } from "@/components/Toaster";
import { ThemeProvider } from "@/components/theme-provider";

interface ProvidersParams {
  children: ReactNode;
}

export function Providers({ children }: ProvidersParams) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableSystem
    >
      <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-mesh" />
        <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-90 w-90 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl md:h-130 md:w-130" />

        {children}
        <BackToTop />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}
