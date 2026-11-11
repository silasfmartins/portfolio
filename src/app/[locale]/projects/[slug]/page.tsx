import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Activity, cache, Suspense } from "react";
import { ProjectDetails } from "@/components/ProjectDetails";
import { ProjectSections } from "@/components/ProjectDetails/ProjectSections";
import { ProjectDetailsSkeleton } from "@/components/Skeletons/ProjectDetailsSkeleton";
import { getProjectDetailsForRequest } from "@/lib/project-detail-data";
import { getLanguageAlternates } from "@/lib/site";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

const getProjectTranslationsForRequest = cache(async (_locale: string) =>
  getTranslations("SlugProjects")
);

export default function Project({ params }: ProjectPageProps) {
  return (
    <Suspense fallback={<ProjectDetailsSkeleton />}>
      <ProjectContent params={params} />
    </Suspense>
  );
}

async function ProjectContent({ params }: ProjectPageProps) {
  const { slug, locale } = await params;
  const [tSlugProject, { project }] = await Promise.all([
    getProjectTranslationsForRequest(locale),
    getProjectDetailsForRequest(slug, locale),
  ]);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Activity>
        <ProjectDetails
          backProjects={tSlugProject("backProjects")}
          project={project}
          projectOnline={tSlugProject("projectOnline")}
          projectsRepository={tSlugProject("projectsRepository")}
          projectsTitle={tSlugProject("projectsTitle")}
        />
      </Activity>
      <Activity>
        <ProjectSections sections={project.sections} />
      </Activity>
    </>
  );
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const { project } = await getProjectDetailsForRequest(slug, locale);

  if (!project) {
    return {};
  }

  const title = project.title || decodeURIComponent(slug);

  return {
    alternates: { languages: getLanguageAlternates(`/projects/${slug}`) },
    description: project.shortDescription,
    // The image comes from `opengraph-image.tsx` next to this page.
    openGraph: {
      description: project.shortDescription,
      title,
      type: "article",
    },
    title,
  };
}
