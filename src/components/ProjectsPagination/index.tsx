import { ChevronLeft, ChevronRight } from "lucide-react";
import { buttonVariants } from "@/components/ui";
import { Link } from "@/navigation";

interface ProjectsPaginationProps {
  copy: {
    label: string;
    next: string;
    page: (page: number) => string;
    previous: string;
  };
  currentPage: number;
  totalPages: number;
}

/** Page 1 lives at `/projects`; the others at `/projects/page/[page]` (all prerendered). */
export function getProjectsPageHref(page: number) {
  return page <= 1 ? "/projects" : `/projects/page/${page}`;
}

export function ProjectsPagination({
  copy,
  currentPage,
  totalPages,
}: ProjectsPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav
      aria-label={copy.label}
      className="container mt-10 flex flex-wrap items-center justify-center gap-2"
    >
      {hasPrevious && (
        <Link
          className={buttonVariants({ size: "sm", variant: "outline" })}
          href={getProjectsPageHref(currentPage - 1)}
          rel="prev"
        >
          <ChevronLeft />
          {copy.previous}
        </Link>
      )}

      {pages.map((page) => {
        const isCurrent = page === currentPage;

        return (
          <Link
            aria-current={isCurrent ? "page" : undefined}
            aria-label={copy.page(page)}
            className={buttonVariants({
              className: "size-9 px-0",
              size: "sm",
              variant: isCurrent ? "default" : "outline",
            })}
            href={getProjectsPageHref(page)}
            key={page}
          >
            {page}
          </Link>
        );
      })}

      {hasNext && (
        <Link
          className={buttonVariants({ size: "sm", variant: "outline" })}
          href={getProjectsPageHref(currentPage + 1)}
          rel="next"
        >
          {copy.next}
          <ChevronRight />
        </Link>
      )}
    </nav>
  );
}
