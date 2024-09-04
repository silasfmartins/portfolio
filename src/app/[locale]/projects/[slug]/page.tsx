import { Metadata } from 'next'

import { ProjectPageData, ProjectsPageStaticData } from '@/types/page-info'
import { fetchHygraphQuery } from '@/utils/fetch-hygraph-query'

import { ProjectDetails } from '@/components/ProjectDetails'
import { ProjectSections } from '@/components/ProjectDetails/ProjectSections'
import { getTranslations } from 'next-intl/server'

interface ProjectProps {
  params: {
    slug: string,
    locale: string
  }
}

async function getProjectDetails(slug: string, locale: string): Promise<ProjectPageData> {
  const query = `
  query ProjectQuery() {
    project(where: {slug: "${slug}"}, locales: ${locale}) {
      pageThumbnail {
        url
      }
      thumbnail {
        url
      }
      sections {
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
      technologies {
        name
      }
      liveProjectUrl
      githubUrl
    }
  }`

  return fetchHygraphQuery(query, locale, 60 * 60 * 24)
}

export default async function Project({ params: { slug, locale } }: ProjectProps) {
  const { project } = await getProjectDetails(slug, locale)

  const tSlugProject = await getTranslations("SlugProjects")

  return (
    <>
      <ProjectDetails projectsTitle={tSlugProject("projectsTitle")} projectsRepository={tSlugProject("projectsRepository")} projectOnline={tSlugProject("projectOnline")} backProjects={tSlugProject("backProjects")} project={project} />
      <ProjectSections sections={project.sections} />
    </>
  )
}

interface generateStaticParamsProps {
  locale: string
}

export async function generateStaticParams({ params }: { params: generateStaticParamsProps }) {
  const query = `
    query ProjectsSlugsQuery() {
      projects(first: 100) {
        slug
      }
    }
  `

  const { locale } = params

  const { projects } = await fetchHygraphQuery<ProjectsPageStaticData>(query, locale)

  return projects
}

export async function generateMetadata({
  params: { slug, locale },
}: ProjectProps): Promise<Metadata> {
  const data = await getProjectDetails(slug, locale)
  const project = data.project

  return {
    title: project.title,
    description: project.description.text,
    openGraph: {
      images: [
        {
          url: project.thumbnail.url,
          width: 1200,
          height: 630,
        },
      ],
    },
  }
}
