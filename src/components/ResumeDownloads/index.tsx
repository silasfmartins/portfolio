import { Eye } from "lucide-react";

import { buttonVariants } from "@/components/ui";
import { Link } from "@/navigation";
import { ResumeDownloadMenu } from "../ResumeDownloadMenu";

export interface ResumeDownloadsProps {
  /** Link to the resume page with the PDF preview (left out on that page itself). */
  preview?: { href: string; label: string };
}

export function ResumeDownloads({ preview }: ResumeDownloadsProps) {
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
      <ResumeDownloadMenu />
    </div>
  );
}
