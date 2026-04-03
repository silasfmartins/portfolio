import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ProjectDetails } from "@/components/ProjectDetails";
import { ProjectSections } from "@/components/ProjectDetails/ProjectSections";
import { getFallbackProjectPageData } from "@/lib/fallback-content";
import { toHygraphLocale } from "@/lib/hygraph-locale";
import type { ProjectPageData } from "@/types/page-info";
import { fetchHygraphQuery } from "@/utils/fetch-hygraph-query";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

async function getProjectDetails(
  slug: string,
  locale: string
): Promise<ProjectPageData> {
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
        sections {
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
        technologies {
          name
        }
        liveProjectUrl
        githubUrl
      }
    }
  `;
  try {
    return await fetchHygraphQuery(query, hygraphLocale, 60 * 60 * 24);
  } catch (error) {
    const reason = error instanceof Error ? error.message : "Unknown error";
    console.warn(
      `[ProjectPage] Falling back to local content because Hygraph request failed: ${reason}`
    );
    return getFallbackProjectPageData(slug);
  }
}

export default async function Project({ params }: ProjectPageProps) {
  const { slug, locale } = await params;

  const [tSlugProject, { project }] = await Promise.all([
    getTranslations("SlugProjects"),
    getProjectDetails(slug, locale),
  ]);

  return (
    <>
      <ProjectDetails
        backProjects={tSlugProject("backProjects")}
        project={project}
        projectOnline={tSlugProject("projectOnline")}
        projectsRepository={tSlugProject("projectsRepository")}
        projectsTitle={tSlugProject("projectsTitle")}
      />
      <ProjectSections sections={project.sections} />
    </>
  );
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: `Projeto: ${decodeURIComponent(slug)}`,
    description: "Detalhes de projeto do portfólio de Silas Martins.",
  };
}
