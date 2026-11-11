"use client";

import { ChevronDown, Download, FileText } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState } from "react";
import { tv } from "tailwind-variants";

import { buttonVariants } from "@/components/ui";
import { getResumeDownloadGroups } from "@/lib/resume/downloads";

const resumeMenuVariants = tv({
  defaultVariants: { variant: "default" },
  slots: {
    base: "relative",
    chevron: "transition-transform",
    group: "border-border/70 not-first-of-type:mt-1 not-first-of-type:border-t",
    groupTitle: "text-foreground px-3 pt-2.5 pb-1 text-xs font-semibold",
    item: "hover:bg-accent hover:text-accent-foreground flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm",
    label: "",
    menu: "border-border bg-card text-card-foreground shadow-elevated z-50 min-w-60 rounded-xl border p-1",
  },
  variants: {
    open: {
      true: { chevron: "rotate-180" },
    },
    variant: {
      // Mobile menu: full width, options open below without floating.
      block: { base: "w-full", menu: "mt-2 w-full" },
      default: { menu: "absolute top-full left-0 mt-2" },
      // Header: icon only below `lg`, menu aligned to the right edge.
      header: {
        label: "sr-only lg:not-sr-only",
        menu: "absolute top-full right-0 mt-2",
      },
    },
  },
});

interface ResumeDownloadMenuProps {
  variant?: "block" | "default" | "header";
}

/** "Baixar currículo" button that opens the choice of style (modern / simple) and language. */
export function ResumeDownloadMenu({
  variant = "default",
}: ResumeDownloadMenuProps) {
  const t = useTranslations("Header");
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const styles = resumeMenuVariants({ open, variant });

  useEffect(() => {
    if (!open) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (!root.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div className={styles.base()} ref={root}>
      <button
        aria-controls={menuId}
        aria-expanded={open}
        className={buttonVariants({
          fullWidth: variant === "block",
          size: variant === "header" ? "sm" : "default",
          variant: "outline",
        })}
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        <Download />
        <span className={styles.label()}>
          {variant === "header" ? t("resume") : t("resumeMenu")}
        </span>
        <ChevronDown className={styles.chevron()} />
      </button>

      {open && (
        <div className={styles.menu()} id={menuId}>
          <p className="text-muted-foreground px-3 pt-2 pb-1 text-xs">
            {t("resumeLanguage")}
          </p>
          {getResumeDownloadGroups().map((group) => {
            const title = t(
              group.style === "simple"
                ? "resumeStyleSimple"
                : "resumeStyleModern"
            );

            return (
              <div
                aria-label={title}
                className={styles.group()}
                key={group.style}
                role="group"
              >
                <p className={styles.groupTitle()}>{title}</p>
                {group.options.map((option) => (
                  <a
                    className={styles.item()}
                    download
                    href={option.href}
                    hrefLang={option.lang}
                    key={option.href}
                    onClick={() => setOpen(false)}
                  >
                    <FileText className="text-primary size-4" />
                    <span className="flex-1">{option.label}</span>
                    <span className="text-muted-foreground text-xs">PDF</span>
                  </a>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
