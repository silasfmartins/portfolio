import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Activity, cache } from "react";

import { ProjectsIntroduction } from "@/components/ProjectsIntroduction";
import { ProjectsList } from "@/components/ProjectsList";
import { ProjectsPagination } from "@/components/ProjectsPagination";
import { ProjectsSearch } from "@/components/ProjectsSearch";
import {
  getProjectsPageDataForRequest,
  getTotalPages,
  PROJECTS_PER_PAGE,
} from "@/lib/projects-data";

const getProjectsTranslationsForRequest = cache(async (_locale: string) =>
  getTranslations("IndexProjects")
);

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
