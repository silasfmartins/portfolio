import type { RichTextContent } from '@graphcms/rich-text-types'
import { KnownTech, Project } from './projects'
import { About } from './about'

export interface Social {
  url: string
  iconSvg: string
}

export interface HomePageInfo {
  introduction: {
    raw: RichTextContent
  }
  technologies: KnownTech[]
  profilePicture: {
    url: string
  }
  socials: Social[]
  knownTechs: KnownTech[]
  highlightProjects: Project[]
  about: About[]
}

export interface ProjectPageData {
  project: Project
}

export interface ProjectsPageData {
  projects: Project[]
}

export interface ProjectsPageStaticData {
  projects: {
    slug: string
  }[]
}

export interface HomePageData {
  page: HomePageInfo
}
