import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Activity, cache } from "react";

import { ProjectsIntroduction } from "@/components/ProjectsIntroduction";
import { ProjectsList } from "@/components/ProjectsList";
import { ProjectsPagination } from "@/components/ProjectsPagination";
import { ProjectsSearch } from "@/components/ProjectsSearch";
import { fallbackProjectsPageData } from "@/lib/fallback-content";
import { toHygraphLocale } from "@/lib/hygraph-locale";
import type { ProjectsPageData } from "@/types/page-info";
import type { Project } from "@/types/projects";
import { fetchHygraphQuery } from "@/utils/fetch-hygraph-query";

export const PROJECTS_PER_PAGE = 9;

// One read serves every page and the search, which looks at all projects.
const getPageData = unstable_cache(
  (locale: string): Promise<ProjectsPageData> => {
    const hygraphLocale = toHygraphLocale(locale);

    const query = `
      query ProjectsQuery {
        projects(first: 100, orderBy: createdAt_ASC, locales: ${hygraphLocale}) {
          shortDescription
          slug
          title
          thumbnail {
            url
          }
          technologies(first: 100) {
            name
          }
        }
      }
    `;
    return fetchHygraphQuery(query, hygraphLocale, 60 * 60 * 24);
  },
  ["projects-page-data"],
  {
    revalidate: 60 * 60 * 24,
    tags: ["projects-page-data"],
  }
);

// Failures are handled outside `unstable_cache` so fallback content is never cached.
export const getProjectsPageDataForRequest = cache(async (locale: string) => {
  try {
    return await getPageData(locale);
  } catch (error) {
    const reason = error instanceof Error ? error.message : "Unknown error";
    console.warn(
      `[ProjectsPage] Falling back to local content because Hygraph request failed: ${reason}`
    );
    return fallbackProjectsPageData;
  }
});
const getProjectsTranslationsForRequest = cache(async (_locale: string) =>
  getTranslations("IndexProjects")
);

export function getTotalPages(projects: Project[]) {
  return Math.max(1, Math.ceil(projects.length / PROJECTS_PER_PAGE));
}

interface ProjectsContentProps {
  locale: string;
  page: number;
}

export async function ProjectsContent({ locale, page }: ProjectsContentProps) {
  const [t, { projects }] = await Promise.all([
    getProjectsTranslationsForRequest(locale),
    getProjectsPageDataForRequest(locale),
  ]);
  const totalPages = getTotalPages(projects);

  if (page > totalPages) {
    notFound();
  }

  const pageStart = (page - 1) * PROJECTS_PER_PAGE;

  return (
    <>
      <Activity>
        <ProjectsIntroduction
          backToHome={t("backToHome")}
          subtitleProjects={t("subtitleProjects")}
          textProjects={t("textProjects")}
          titleProjects={t("titleProjects")}
        />
      </Activity>
      <Activity>
        <ProjectsSearch projects={projects}>
          <ProjectsList
            projects={projects.slice(pageStart, pageStart + PROJECTS_PER_PAGE)}
          >
            <ProjectsPagination
              copy={{
                label: t("pagination"),
                next: t("nextPage"),
                page: (current) => t("page", { page: current }),
                previous: t("previousPage"),
              }}
              currentPage={page}
              totalPages={totalPages}
            />
          </ProjectsList>
        </ProjectsSearch>
      </Activity>
    </>
  );
}
