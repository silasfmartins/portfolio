import { ArrowRight } from "lucide-react";

import type { Project } from "@/types/projects";
import { HorizontalDivider } from "../HorizontalDivider";
import { NextLink } from "../Link";
import { SectionTitle } from "../SectionTitle";
import { ProjectCard } from "./ProjectCard";

interface HighlighetdProjectsProps {
  projects: Project[];
  subtitleEmphasis: string;
  text1Emphasis: string;
  text2Emphasis: string;
  titleEmphasis: string;
  viewProjects: string;
}

export function HighlighetdProjects({
  viewProjects,
  titleEmphasis,
  subtitleEmphasis,
  text1Emphasis,
  text2Emphasis,
  projects,
}: HighlighetdProjectsProps) {
  return (
    <section className="py-16 sm:py-20">
      <div className="container">
        <SectionTitle subtitle={subtitleEmphasis} title={titleEmphasis} />
        <HorizontalDivider />

        <div className="space-y-8">
          {projects?.map((project) => (
            <div className="space-y-8" key={project.slug}>
              <ProjectCard project={project} viewProjects={viewProjects} />
              <HorizontalDivider className="my-0" />
            </div>
          ))}

          <p className="flex flex-wrap items-center gap-2 text-muted-foreground text-sm">
            <span>{text1Emphasis}</span>
            <NextLink className="font-semibold" href="/projects">
              {text2Emphasis}
              <ArrowRight className="h-4 w-4" />
            </NextLink>
          </p>
        </div>
      </div>
    </section>
  );
}
