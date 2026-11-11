"use client";

import { ExternalLink } from "lucide-react";
import { useState, useSyncExternalStore } from "react";

import { buttonVariants } from "@/components/ui";
import type { ResumeStyle } from "@/lib/resume/resume-styles";

interface ResumePreviewProps {
  copy: {
    noPreview: string;
    openPdf: string;
    previewTitle: string;
    styleLabel: string;
    styles: Record<ResumeStyle, string>;
  };
  /** Preview URL of each style; the first one is shown first. */
  hrefs: Record<ResumeStyle, string>;
}

const subscribe = () => () => undefined;

/**
 * Shows one resume style at a time, with buttons to switch between them.
 * Most phones have no built-in PDF viewer: they get a button to open the PDF instead of an empty frame.
 */
export function ResumePreview({ copy, hrefs }: ResumePreviewProps) {
  const styles = Object.keys(hrefs) as ResumeStyle[];
  const [style, setStyle] = useState(styles[0]);
  const href = hrefs[style];
  const canShowPdf = useSyncExternalStore(
    subscribe,
    () => navigator.pdfViewerEnabled !== false,
    () => true
  );

  const openButton = (
    <a
      className={buttonVariants({ variant: canShowPdf ? "link" : "default" })}
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      <ExternalLink />
      {copy.openPdf}
    </a>
  );

  const styleSwitch = (
    <div aria-label={copy.styleLabel} className="flex gap-2" role="group">
      {styles.map((item) => (
        <button
          aria-pressed={item === style}
          className={buttonVariants({
            size: "sm",
            variant: item === style ? "default" : "outline",
          })}
          key={item}
          onClick={() => setStyle(item)}
          type="button"
        >
          {copy.styles[item]}
        </button>
      ))}
    </div>
  );

  if (!canShowPdf) {
    return (
      <div className="space-y-3">
        {styleSwitch}
        <div className="border-border bg-card flex flex-col items-center gap-4 rounded-2xl border p-10 text-center">
          <p className="text-muted-foreground">{copy.noPreview}</p>
          {openButton}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {styleSwitch}
      {/* Browsers that ignore `pdfViewerEnabled` still render the fallback inside `<object>`. */}
      <object
        aria-label={`${copy.previewTitle} - ${copy.styles[style]}`}
        className="border-border bg-card shadow-card h-[80vh] min-h-[480px] w-full rounded-2xl border"
        data={href}
        key={href}
        type="application/pdf"
      >
        <div className="flex h-full flex-col items-center justify-center gap-4 p-10 text-center">
          <p className="text-muted-foreground">{copy.noPreview}</p>
        </div>
      </object>
      {openButton}
    </div>
  );
}
