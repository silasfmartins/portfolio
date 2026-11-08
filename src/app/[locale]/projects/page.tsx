import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense, use } from "react";

import { ProjectsPageSkeleton } from "@/components/Skeletons/ProjectsPageSkeleton";
import { getLanguageAlternates } from "@/lib/site";
import { ProjectsContent } from "./projects-content";

interface ProjectsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ProjectsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    alternates: { languages: getLanguageAlternates("/projects") },
    description: t("projectsDescription"),
    title: t("projectsTitle"),
  };
}

export default function Projects({ params }: ProjectsPageProps) {
  const { locale } = use(params);

  return (
    <Suspense fallback={<ProjectsPageSkeleton />}>
      <ProjectsContent locale={locale} page={1} />
    </Suspense>
  );
}
