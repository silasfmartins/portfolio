"use client";

import { Toaster as ToasterProvider } from "react-hot-toast";

export function Toaster() {
  return (
    <ToasterProvider
      position="top-right"
      toastOptions={{
        error: {
          iconTheme: {
            primary: "hsl(var(--destructive))",
            secondary: "hsl(var(--destructive-foreground))",
          },
        },
        style: {
          background: "hsl(var(--card))",
          border: "1px solid hsl(var(--border))",
          color: "hsl(var(--card-foreground))",
        },
        success: {
          iconTheme: {
            primary: "hsl(var(--success))",
            secondary: "hsl(var(--card))",
          },
        },
      }}
    />
  );
}
