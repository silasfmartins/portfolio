import { Download, Eye } from "lucide-react";

import { buttonVariants } from "@/components/ui";
import type { ResumeDownloadOption } from "@/lib/resume/downloads";
import { Link } from "@/navigation";

export interface ResumeDownloadsProps {
  label: string;
  options: ResumeDownloadOption[];
  /** Link to the resume page with the PDF preview (left out on that page itself). */
  preview?: { href: string; label: string };
}

export function ResumeDownloads({
  label,
  options,
  preview,
}: ResumeDownloadsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      {preview && (
        <Link
          className={buttonVariants({ size: "sm", variant: "outline" })}
          href={preview.href}
        >
          <Eye />
          {preview.label}
        </Link>
      )}
      <span className="text-muted-foreground flex items-center gap-1.5">
        <Download className="size-4" />
        {label}:
      </span>
      {options.map((option) => (
        <a
          aria-label={option.ariaLabel}
          className={buttonVariants({ size: "sm", variant: "outline" })}
          download
          href={option.href}
          hrefLang={option.lang}
          key={option.href}
        >
          {option.label}
        </a>
      ))}
    </div>
  );
}
