"use client";

import { Toaster as ToasterProvider } from "react-hot-toast";

export function Toaster() {
  return (
    <ToasterProvider
      position="top-right"
      toastOptions={{
        style: {
          border: "1px solid hsl(var(--border))",
          background: "hsl(var(--card))",
          color: "hsl(var(--card-foreground))",
        },
        success: {
          iconTheme: {
            primary: "#10b981",
            secondary: "#ffffff",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#ffffff",
          },
        },
      }}
    />
  );
}
