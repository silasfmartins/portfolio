import { unstable_cache } from "next/cache";
import { getTranslations } from "next-intl/server";
import { cache, Suspense, use } from "react";

import { ProjectsIntroduction } from "@/components/ProjectsIntroduction";
import { ProjectsList } from "@/components/ProjectsList";
import { fallbackProjectsPageData } from "@/lib/fallback-content";
import { toHygraphLocale } from "@/lib/hygraph-locale";
import type { ProjectsPageData } from "@/types/page-info";
import { fetchHygraphQuery } from "@/utils/fetch-hygraph-query";
import Loading from "./loading";

export const metadata = {
  title: "Projetos",
  description: "Página que apresenta os projetos React.js de Silas Martins.",
};

const getPageData = unstable_cache(
  async (locale: string): Promise<ProjectsPageData> => {
    const hygraphLocale = toHygraphLocale(locale);

    const query = `
      query ProjectsQuery {
        projects(locales: ${hygraphLocale}) {
          shortDescription
          slug
          title
          thumbnail {
            url
          }
          technologies {
            name
          }
        }
      }
    `;
    try {
      return await fetchHygraphQuery(query, hygraphLocale, 60 * 60 * 24);
    } catch (error) {
      const reason = error instanceof Error ? error.message : "Unknown error";
      console.warn(
        `[ProjectsPage] Falling back to local content because Hygraph request failed: ${reason}`
      );
      return fallbackProjectsPageData;
    }
  },
  ["projects-page-data"],
  {
    revalidate: 60 * 60 * 24,
    tags: ["projects-page-data"],
  }
);

const getProjectsPageDataForRequest = cache(async (locale: string) =>
  getPageData(locale)
);
const getProjectsTranslationsForRequest = cache(async (_locale: string) =>
  getTranslations("IndexProjects")
);

interface ProjectsPageProps {
  params: Promise<{ locale: string }>;
}

export default function Projects({ params }: ProjectsPageProps) {
  const { locale } = use(params);

  return (
    <Suspense fallback={<Loading />}>
      <ProjectsContent locale={locale} />
    </Suspense>
  );
}

interface ProjectsContentProps {
  locale: string;
}

async function ProjectsContent({ locale }: ProjectsContentProps) {
  const [t, { projects }] = await Promise.all([
    getProjectsTranslationsForRequest(locale),
    getProjectsPageDataForRequest(locale),
  ]);

  return (
    <>
      <ProjectsIntroduction
        backToHome={t("backToHome")}
        subtitleProjects={t("subtitleProjects")}
        textProjects={t("textProjects")}
        titleProjects={t("titleProjects")}
      />
      <ProjectsList projects={projects} />
    </>
  );
}
