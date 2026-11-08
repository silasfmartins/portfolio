import type { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Activity, cache, Suspense } from "react";
import { ProjectDetails } from "@/components/ProjectDetails";
import { ProjectSections } from "@/components/ProjectDetails/ProjectSections";
import { ProjectDetailsSkeleton } from "@/components/Skeletons/ProjectDetailsSkeleton";
import { getFallbackProjectPageData } from "@/lib/fallback-content";
import { toHygraphLocale } from "@/lib/hygraph-locale";
import { getLanguageAlternates } from "@/lib/site";
import type { ProjectPageData } from "@/types/page-info";
import { fetchHygraphQuery } from "@/utils/fetch-hygraph-query";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

const getProjectDetails = unstable_cache(
  (slug: string, locale: string): Promise<ProjectPageData> => {
    const hygraphLocale = toHygraphLocale(locale);

    const query = `
      query ProjectQuery {
        project(where: {slug: "${slug}"}, locales: ${hygraphLocale}) {
          pageThumbnail {
            url
          }
          thumbnail {
            url
          }
          sections(first: 100) {
            title
            image {
              url
            }
          }
          title
          shortDescription
          description {
            raw
            text
          }
          technologies(first: 100) {
            name
          }
          liveProjectUrl
          githubUrl
        }
      }
    `;
    return fetchHygraphQuery(query, hygraphLocale, 60 * 60 * 24);
  },
  ["project-details-page-data"],
  {
    revalidate: 60 * 60 * 24,
    tags: ["project-details-page-data"],
  }
);

// Failures are handled outside `unstable_cache` so fallback content is never cached.
const getProjectDetailsForRequest = cache(
  async (slug: string, locale: string) => {
    try {
      return await getProjectDetails(slug, locale);
    } catch (error) {
      const reason = error instanceof Error ? error.message : "Unknown error";
      console.warn(
        `[ProjectPage] Falling back to local content because Hygraph request failed: ${reason}`
      );
      return getFallbackProjectPageData(slug);
    }
  }
);
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
  const image = project.thumbnail?.url ?? project.pageThumbnail?.url;

  return {
    alternates: { languages: getLanguageAlternates(`/projects/${slug}`) },
    description: project.shortDescription,
    openGraph: {
      description: project.shortDescription,
      images: image ? [image] : undefined,
      title,
    },
    title,
  };
}
