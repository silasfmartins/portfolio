import type { RichTextContent } from "@graphcms/rich-text-types";
import type { KnownTech, Project } from "./projects";

export interface Social {
  iconSvg: string;
  url: string;
}

export interface About {
  companyLogo: {
    url: string;
  };
  companyName: string;
  companyUrl: string;
  endDate: string;
  role: string;
  startDate: string;
}

export interface WorkExperience {
  companyLogo: {
    url: string;
  };
  companyName: string;
  companyUrl: string;
  description: {
    raw: RichTextContent;
  } | null;
  endDate: string;
  role: string;
  startDate: string;
}

export interface HomePageInfo {
  about: About[];
  highlightProjects: Project[];
  introduction: {
    raw: RichTextContent;
  };
  knownTechs: KnownTech[];
  profilePicture: {
    url: string;
  };
  socials: Social[];
  technologies: KnownTech[];
  workExperiences: WorkExperience[];
}

export interface ProjectPageData {
  project: Project;
}

export interface ProjectsPageData {
  projects: Project[];
}

export interface ProjectsPageStaticData {
  projects: {
    slug: string;
  }[];
}

export interface HomePageData {
  page: HomePageInfo;
}
