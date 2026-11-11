import { Font } from "@react-pdf/renderer";
import { format } from "date-fns";

import { getDateLocale, getPresentLabel } from "@/lib/date-labels";
import type { HomePageInfo } from "@/types/page-info";
import type { Course } from "./courses";
import type { ResumeContent } from "./resume-content";

// Words are never split with hyphens.
Font.registerHyphenationCallback((word) => [word]);

export interface ResumeCopy {
  aboutMe: string;
  certifications: string;
  contact: string;
  education: string;
  experience: string;
  generatedFrom: string;
  objective: string;
  projects: string;
  skills: string;
  summary: string;
}

export interface ResumeContact {
  /** Short mark shown before the link, like the icons of a printed resume. */
  icon: string;
  label: string;
  url: string;
}

export interface ResumePhoto {
  data: Buffer;
  format: "jpg";
}

/**
 * How much of the featured projects fits. The route starts with everything and tightens
 * step by step until the resume fits on one page.
 */
export interface ResumeFit {
  maxProjects: number;
  /** Shows each project's short description, not only its title and technologies. */
  projectDescriptions: boolean;
}

export interface ResumeDocumentProps {
  /** "22 anos | São Paulo, SP". */
  ageAndPlace: string;
  contacts: ResumeContact[];
  content: ResumeContent;
  copy: ResumeCopy;
  courses: Course[];
  fit: ResumeFit;
  info: HomePageInfo;
  locale: string;
  photo: ResumePhoto | null;
  siteUrl: string;
}

/** "jan 2025 - o momento". */
export function periodLabel(locale: string, start: string, end?: string) {
  const dateLocale = getDateLocale(locale);
  const startLabel = format(new Date(start), "MMM yyyy", {
    locale: dateLocale,
  });
  const endLabel = end
    ? format(new Date(end), "MMM yyyy", { locale: dateLocale })
    : getPresentLabel(locale);

  return `${startLabel} - ${endLabel}`;
}

export function courseMeta(course: Course) {
  return course.year ? `${course.provider} · ${course.year}` : course.provider;
}

const MAX_TECHNOLOGIES = 8;

/** "Next.js · Node.js · …" with at most 8 names, so one long project never fills the page. */
export function technologiesLabel(technologies: { name: string }[]) {
  const names = technologies.map((technology) => technology.name);
  const shown = names.slice(0, MAX_TECHNOLOGIES).join(" · ");
  return names.length > MAX_TECHNOLOGIES ? `${shown} · …` : shown;
}
