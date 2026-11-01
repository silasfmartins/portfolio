import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Activity, cache } from "react";

import { ProjectsIntroduction } from "@/components/ProjectsIntroduction";
import { ProjectsList } from "@/components/ProjectsList";
import { ProjectsPagination } from "@/components/ProjectsPagination";
import { fallbackProjectsPageData } from "@/lib/fallback-content";
import { toHygraphLocale } from "@/lib/hygraph-locale";
import type { ProjectsPageData } from "@/types/page-info";
import { fetchHygraphQuery } from "@/utils/fetch-hygraph-query";

export const PROJECTS_PER_PAGE = 9;

const getPageData = unstable_cache(
  (locale: string, page: number): Promise<ProjectsPageData> => {
    const hygraphLocale = toHygraphLocale(locale);
    const skip = (page - 1) * PROJECTS_PER_PAGE;

    const query = `
      query ProjectsQuery {
        projects(first: ${PROJECTS_PER_PAGE}, skip: ${skip}, orderBy: createdAt_ASC, locales: ${hygraphLocale}) {
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
        projectsConnection(locales: ${hygraphLocale}) {
          aggregate {
            count
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
export const getProjectsPageDataForRequest = cache(
  async (locale: string, page: number) => {
    try {
      return await getPageData(locale, page);
    } catch (error) {
      const reason = error instanceof Error ? error.message : "Unknown error";
      console.warn(
        `[ProjectsPage] Falling back to local content because Hygraph request failed: ${reason}`
      );
      return fallbackProjectsPageData;
    }
  }
);
const getProjectsTranslationsForRequest = cache(async (_locale: string) =>
  getTranslations("IndexProjects")
);

export function getTotalPages({ projectsConnection }: ProjectsPageData) {
  return Math.max(
    1,
    Math.ceil(projectsConnection.aggregate.count / PROJECTS_PER_PAGE)
  );
}

interface ProjectsContentProps {
  locale: string;
  page: number;
}

export async function ProjectsContent({ locale, page }: ProjectsContentProps) {
  const [t, pageData] = await Promise.all([
    getProjectsTranslationsForRequest(locale),
    getProjectsPageDataForRequest(locale, page),
  ]);
  const totalPages = getTotalPages(pageData);

  if (page > totalPages) {
    notFound();
  }

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
        <ProjectsList projects={pageData.projects}>
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
      </Activity>
    </>
  );
}
