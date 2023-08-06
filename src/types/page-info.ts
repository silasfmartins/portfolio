import type { RichTextContent } from '@graphcms/rich-text-types'
import { KnownTech, Project } from './projects'

export interface Social {
  url: string
  iconSvg: string
}

export interface About {
  companyLogo: {
    url: string
  }
  role: string
  companyName: string
  companyUrl: string
  startDate: string
  endDate: string
}

export interface WorkExperience {
  companyLogo: {
    url: string
  }
  role: string
  companyName: string
  companyUrl: string
  startDate: string
  endDate: string
  description: {
    raw: RichTextContent
  }
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
  workExperiences: WorkExperience[]
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
