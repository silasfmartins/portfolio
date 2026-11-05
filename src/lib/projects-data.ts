import { unstable_cache } from "next/cache";
import { cache } from "react";

import { fallbackProjectsPageData } from "@/lib/fallback-content";
import { toHygraphLocale } from "@/lib/hygraph-locale";
import type { ProjectsPageData } from "@/types/page-info";
import type { Project } from "@/types/projects";
import { fetchHygraphQuery } from "@/utils/fetch-hygraph-query";

export const PROJECTS_PER_PAGE = 9;

// One read serves every page, the search, the quick search and the sitemap.
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

export function getTotalPages(projects: Project[]) {
  return Math.max(1, Math.ceil(projects.length / PROJECTS_PER_PAGE));
}
