"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "@/navigation";

const LOCALES = [
  { value: "pt-BR", label: "PT" },
  { value: "en", label: "EN" },
] as const;

export default function LocalSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const activeLocale = useLocale();

  function handleLocaleChange(nextLocale: (typeof LOCALES)[number]["value"]) {
    if (nextLocale === activeLocale) {
      return;
    }

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <div className="inline-flex items-center rounded-lg border border-border/80 bg-card/60 p-1 shadow-sm">
      {LOCALES.map((localeOption) => {
        const isActive = activeLocale === localeOption.value;

        return (
          <button
            aria-label={`Change language to ${localeOption.label}`}
            className={cn(
              "rounded-md px-2.5 py-1 font-medium text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-60",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
            disabled={isPending}
            key={localeOption.value}
            onClick={() => handleLocaleChange(localeOption.value)}
            type="button"
          >
            {localeOption.label}
          </button>
        );
      })}
    </div>
  );
}
