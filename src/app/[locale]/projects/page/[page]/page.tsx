import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense, use } from "react";

import { ProjectsPageSkeleton } from "@/components/Skeletons/ProjectsPageSkeleton";
import {
  getProjectsPageDataForRequest,
  getTotalPages,
} from "@/lib/projects-data";
import { ProjectsContent } from "../../projects-content";

interface ProjectsPaginatedPageProps {
  params: Promise<{ locale: string; page: string }>;
}

/** Page 1 is `/projects`; this route prerenders pages 2..N for each locale. */
export async function generateStaticParams({
  params,
}: {
  params: { locale: string };
}) {
  const { projects } = await getProjectsPageDataForRequest(params.locale);
  const totalPages = getTotalPages(projects);

  // Cache Components needs at least one entry; page 2 answers 404 while there is a single page.
  return Array.from({ length: Math.max(totalPages - 1, 1) }, (_, index) => ({
    page: String(index + 2),
  }));
}

function toPageNumber(page: string) {
  const pageNumber = Number(page);
  return Number.isInteger(pageNumber) && pageNumber >= 2 ? pageNumber : null;
}

export async function generateMetadata({
  params,
}: ProjectsPaginatedPageProps): Promise<Metadata> {
  const pageNumber = toPageNumber((await params).page);

  return {
    description: "Página que apresenta os projetos React.js de Silas Martins.",
    title: pageNumber ? `Projetos · ${pageNumber}` : "Projetos",
  };
}

export default function ProjectsPaginatedPage({
  params,
}: ProjectsPaginatedPageProps) {
  const { locale, page } = use(params);
  const pageNumber = toPageNumber(page);

  if (pageNumber === null) {
    notFound();
  }

  return (
    <Suspense fallback={<ProjectsPageSkeleton />}>
      <ProjectsContent locale={locale} page={pageNumber} />
    </Suspense>
  );
}
