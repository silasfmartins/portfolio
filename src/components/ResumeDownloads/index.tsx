import { Download, Eye } from "lucide-react";

import { buttonVariants } from "@/components/ui";
import type { ResumeDownloadOption } from "@/lib/resume/downloads";
import { Link } from "@/navigation";

export interface ResumeDownloadsProps {
  options: ResumeDownloadOption[];
  /** Link to the resume page with the PDF preview (left out on that page itself). */
  preview?: { href: string; label: string };
}

export function ResumeDownloads({ options, preview }: ResumeDownloadsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {preview && (
        <Link
          className={buttonVariants({ variant: "secondary" })}
          href={preview.href}
        >
          <Eye />
          {preview.label}
        </Link>
      )}
      {options.map((option) => (
        <a
          className={buttonVariants({ variant: "outline" })}
          download
          href={option.href}
          hrefLang={option.lang}
          key={option.href}
        >
          <Download />
          {option.label}
        </a>
      ))}
    </div>
  );
}
