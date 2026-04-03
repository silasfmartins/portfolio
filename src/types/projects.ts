import type { RichTextContent } from "@graphcms/rich-text-types";

export type KnownTech = {
  iconSvg: string;
  name: string;
  startDate: string;
};

export interface ProjectSection {
  image: {
    url: string;
  } | null;
  title: string;
}

export interface Project {
  description: {
    raw: RichTextContent;
    text: string;
  };
  githubUrl?: string;
  liveProjectUrl?: string;
  pageThumbnail: {
    url: string;
  } | null;
  sections: ProjectSection[];
  shortDescription: string;
  slug: string;
  technologies: KnownTech[];
  thumbnail: {
    url: string;
  } | null;
  title: string;
}
