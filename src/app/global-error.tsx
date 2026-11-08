"use client";

import "./[locale]/globals.css";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/** Failure in the layout itself: no providers here, so the text is fixed and in all languages. */
export default function GlobalError({ reset }: GlobalErrorProps) {
  return (
    <html lang="pt-BR">
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
        <h1 className="text-2xl font-semibold">
          Algo deu errado · Something went wrong · Algo salió mal
        </h1>
        <button
          className="bg-primary text-primary-foreground rounded-lg px-5 py-2 text-sm font-medium"
          onClick={reset}
          type="button"
        >
          Tentar de novo · Try again · Intentar de nuevo
        </button>
      </body>
    </html>
  );
}
