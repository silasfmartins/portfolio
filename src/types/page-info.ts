import type { RichTextContent } from '@graphcms/rich-text-types'
import { AcademicEducation } from './about'
import { KnownTech, Project } from './projects'

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
  academicEducation: AcademicEducation[]
  knownTechs: KnownTech[]
  highlightProjects: Project[]
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
