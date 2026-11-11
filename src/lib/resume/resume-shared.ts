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

export interface ResumeDocumentProps {
  contacts: ResumeContact[];
  content: ResumeContent;
  copy: ResumeCopy;
  courses: Course[];
  info: HomePageInfo;
  locale: string;
  /** How many featured projects to show; 0 when the resume would pass 2 pages. */
  maxProjects: number;
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
