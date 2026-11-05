"use client";

import { MotionConfig } from "framer-motion";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { ReactNode } from "react";
import { BackToTop } from "@/components/BackToTop";
import { Toaster } from "@/components/Toaster";
import { ThemeProvider } from "@/components/theme-provider";

interface ProvidersParams {
  children: ReactNode;
}

export function Providers({ children }: ProvidersParams) {
  return (
    <NuqsAdapter>
      <MotionConfig reducedMotion="user">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <div className="bg-background text-foreground relative isolate min-h-screen overflow-hidden">
            <div className="bg-mesh pointer-events-none absolute inset-0 -z-10" />
            <div className="bg-primary/15 pointer-events-none absolute top-0 left-1/2 -z-10 h-90 w-90 -translate-x-1/2 rounded-full blur-3xl md:h-130 md:w-130" />

            {children}
            <BackToTop />
            <Toaster />
          </div>
        </ThemeProvider>
      </MotionConfig>
    </NuqsAdapter>
  );
}
