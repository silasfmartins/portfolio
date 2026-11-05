"use client";

import { ArrowLeft, RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

import { Button, buttonVariants } from "@/components/ui";
import { Link } from "@/navigation";

interface StatusScreenProps {
  children?: ReactNode;
  label: string;
  text: string;
  title: string;
}

function StatusScreen({ children, label, text, title }: StatusScreenProps) {
  const t = useTranslations("Status");

  return (
    <section className="py-20 sm:py-28">
      <div className="container">
        <div className="border-border/70 bg-card/70 mx-auto max-w-2xl rounded-3xl border p-8 text-center backdrop-blur-xl sm:p-12">
          <p className="text-primary font-mono text-xs tracking-[0.16em] uppercase">
            {label}
          </p>
          <h1 className="font-display text-foreground mt-3 text-4xl font-semibold sm:text-5xl">
            {title}
          </h1>
          <p className="text-muted-foreground mt-4 text-sm leading-relaxed sm:text-base">
            {text}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {children}
            <Link
              className={buttonVariants({
                variant: children ? "outline" : "default",
              })}
              href="/"
            >
              <ArrowLeft />
              {t("goHome")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function NotFoundScreen() {
  const t = useTranslations("Status");

  return (
    <StatusScreen
      label={t("notFoundLabel")}
      text={t("notFoundText")}
      title={t("notFoundTitle")}
    />
  );
}

/** Unexpected failure inside a page: never a blank screen. */
export function ErrorScreen({ retry }: { retry: () => void }) {
  const t = useTranslations("Status");

  return (
    <StatusScreen
      label={t("errorLabel")}
      text={t("errorText")}
      title={t("errorTitle")}
    >
      <Button onClick={retry}>
        <RotateCcw />
        {t("retry")}
      </Button>
    </StatusScreen>
  );
}
