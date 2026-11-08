"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { tv } from "tailwind-variants";
import { usePathname, useRouter } from "@/navigation";

const LOCALES = [
  { label: "PT", value: "pt-BR" },
  { label: "EN", value: "en" },
  { label: "ES", value: "es" },
] as const;

const localeOptionVariants = tv({
  base: "rounded-md px-2.5 py-1 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60",
  variants: {
    active: {
      false: "text-muted-foreground hover:text-foreground",
      true: "bg-primary text-primary-foreground",
    },
  },
});

export function LocalSwitcher() {
  const t = useTranslations("Header");
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
    <div className="border-border/80 bg-card/60 inline-flex items-center rounded-lg border p-1 shadow-sm">
      {LOCALES.map((localeOption) => {
        const isActive = activeLocale === localeOption.value;

        return (
          <button
            aria-label={t("changeLanguage", { language: localeOption.label })}
            className={localeOptionVariants({ active: isActive })}
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
