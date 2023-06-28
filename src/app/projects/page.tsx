import { ProjectsPageData } from '@/types/page-info'
import { fetchHygraphQuery } from '@/utils/fetch-hygraph-query'

import { ProjectsIntroduction } from '@/components/ProjectsIntroduction'
import { ProjectsList } from '@/components/ProjectsList'

export const metadata = {
  title: 'Projetos',
}

async function getPageData(): Promise<ProjectsPageData> {
  const query = `
  query ProjectsQuery {
    projects {
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

  return fetchHygraphQuery(query, 60 * 60 * 24)
}

export default async function Projects() {
  const { projects } = await getPageData()

  return (
    <>
      <ProjectsIntroduction />
      <ProjectsList projects={projects} />
    </>
  )
}
