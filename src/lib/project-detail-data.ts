import { unstable_cache } from "next/cache";
import { cache } from "react";

import { getFallbackProjectPageData } from "@/lib/fallback-content";
import { toHygraphLocale } from "@/lib/hygraph-locale";
import type { ProjectPageData } from "@/types/page-info";
import {
  fetchHygraphQuery,
  hasHygraphConfig,
} from "@/utils/fetch-hygraph-query";

// Shared by the project page, its metadata and its Open Graph image.
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
export const getProjectDetailsForRequest = cache(
  async (slug: string, locale: string) => {
    if (!hasHygraphConfig()) {
      return getFallbackProjectPageData(slug);
    }

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
