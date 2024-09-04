import { ProjectsPageData } from '@/types/page-info'
import { fetchHygraphQuery } from '@/utils/fetch-hygraph-query'

import { ProjectsIntroduction } from '@/components/ProjectsIntroduction'
import { ProjectsList } from '@/components/ProjectsList'
import { getTranslations } from 'next-intl/server'

export const metadata = {
  title: 'Projetos',
  description:
    'Página que apresenta todos os projetos React.js de Silas Martins',
}

async function getPageData(locale: string): Promise<ProjectsPageData> {
  const query = `
  query ProjectsQuery {
    projects(locales: ${locale}) {
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
  }`

  return fetchHygraphQuery(query, locale, 60 * 60 * 24)
}

interface ProjectsProps {
  locale: string
}

export default async function Projects({ params }: { params: ProjectsProps}) {
  const t = await getTranslations("IndexProjects")
  const { locale } = params

  const { projects } = await getPageData(locale)

  return (
    <>
      <ProjectsIntroduction titleProjects={t("titleProjects")}  subtitleProjects={t("subtitleProjects")} textProjects={t("textProjects")} backToHome={t("backToHome")} />
      <ProjectsList projects={projects} />
    </>
  )
}
