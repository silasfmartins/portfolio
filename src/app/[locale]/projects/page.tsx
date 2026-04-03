import { getTranslations } from "next-intl/server";

import { ProjectsIntroduction } from "@/components/ProjectsIntroduction";
import { ProjectsList } from "@/components/ProjectsList";
import { fallbackProjectsPageData } from "@/lib/fallback-content";
import { toHygraphLocale } from "@/lib/hygraph-locale";
import type { ProjectsPageData } from "@/types/page-info";
import { fetchHygraphQuery } from "@/utils/fetch-hygraph-query";

export const metadata = {
  title: "Projetos",
  description: "Página que apresenta os projetos React.js de Silas Martins.",
};

async function getPageData(locale: string): Promise<ProjectsPageData> {
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
}

interface ProjectsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function Projects({ params }: ProjectsPageProps) {
  const { locale } = await params;

  const [t, { projects }] = await Promise.all([
    getTranslations("IndexProjects"),
    getPageData(locale),
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
