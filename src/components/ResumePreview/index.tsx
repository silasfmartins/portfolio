"use client";

import { ExternalLink } from "lucide-react";
import { useSyncExternalStore } from "react";

import { buttonVariants } from "@/components/ui";

interface ResumePreviewProps {
  copy: { noPreview: string; openPdf: string; previewTitle: string };
  href: string;
}

const subscribe = () => () => undefined;

/** Most phones have no built-in PDF viewer: they get a button to open the PDF instead of an empty frame. */
export function ResumePreview({ copy, href }: ResumePreviewProps) {
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

  if (!canShowPdf) {
    return (
      <div className="border-border bg-card flex flex-col items-center gap-4 rounded-2xl border p-10 text-center">
        <p className="text-muted-foreground">{copy.noPreview}</p>
        {openButton}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {/* Browsers that ignore `pdfViewerEnabled` still render the fallback inside `<object>`. */}
      <object
        aria-label={copy.previewTitle}
        className="border-border bg-card shadow-card h-[80vh] min-h-[480px] w-full rounded-2xl border"
        data={href}
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
