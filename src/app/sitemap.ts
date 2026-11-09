import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";
import {
  getProjectsPageDataForRequest,
  getTotalPages,
} from "@/lib/projects-data";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { projects } = await getProjectsPageDataForRequest(
    routing.defaultLocale
  );
  const extraPages = Array.from(
    { length: getTotalPages(projects) - 1 },
    (_, index) => `/projects/page/${index + 2}`
  );
  const paths = [
    "",
    "/projects",
    "/privacy",
    "/resume",
    ...extraPages,
    ...projects.map((project) => `/projects/${project.slug}`),
  ];

  return routing.locales.flatMap((locale) =>
    paths.map((path) => ({ url: `${SITE_URL}/${locale}${path}` }))
  );
}
