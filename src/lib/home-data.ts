import { unstable_cache } from "next/cache";
import { cache } from "react";

import { fallbackHomePageData } from "@/lib/fallback-content";
import { toHygraphLocale } from "@/lib/hygraph-locale";
import type { HomePageData } from "@/types/page-info";
import { fetchHygraphQuery } from "@/utils/fetch-hygraph-query";

// Shared by the home page and the resume PDF, so both read the same cached data.
const getPageData = unstable_cache(
  (locale: string): Promise<HomePageData> => {
    const hygraphLocale = toHygraphLocale(locale);

    const query = `
      query PageInfoQuery {
        page(where: {slug: "home"}, locales: ${hygraphLocale}) {
          introduction {
            raw
          }
          technologies(first: 100) {
            name
          }
          profilePicture {
            url
          }
          socials(first: 100) {
            url
            iconSvg
          }
          knownTechs(first: 100) {
            iconSvg
            name
            startDate
          }
          highlightProjects(first: 100) {
            slug
            thumbnail {
              url
            }
            title
            shortDescription
            technologies(first: 100) {
              name
            }
          }
          about(first: 100) {
            companyLogo {
              url
            }
            role
            companyName
            companyUrl
            startDate
            endDate
          }
          workExperiences(first: 100) {
            companyLogo {
              url
            }
            role
            companyName
            companyUrl
            startDate
            endDate
            description {
              raw
            }
          }
        }
      }
    `;
    return fetchHygraphQuery(query, hygraphLocale, 60 * 60 * 24);
  },
  ["home-page-data"],
  {
    revalidate: 60 * 60 * 24,
    tags: ["home-page-data"],
  }
);

// Failures are handled outside `unstable_cache` so fallback content is never cached.
export const getHomePageDataForRequest = cache(async (locale: string) => {
  try {
    return await getPageData(locale);
  } catch (error) {
    const reason = error instanceof Error ? error.message : "Unknown error";
    console.warn(
      `[HomePage] Falling back to local content because Hygraph request failed: ${reason}`
    );
    return fallbackHomePageData;
  }
});
