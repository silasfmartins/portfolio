import { Project } from '@/types/projects'

import { SectionTitle } from '../SectionTitle'
import { HorizontalDivider } from '../HorizontalDivider'
import { ProjectCard } from './ProjectCard'
import { NextLink } from '../Link'
import { ArrowRight } from 'lucide-react'

interface HighlighetdProjectsProps {
  titleEmphasis: any,
  subtitleEmphasis: any,
  text1Emphasis: any,
  text2Emphasis: any,
  viewProjects: string,
  projects: Project[]
}

export function HighlighetdProjects({ viewProjects, titleEmphasis, subtitleEmphasis, text1Emphasis, text2Emphasis, projects }: HighlighetdProjectsProps) {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-6 py-16">
      <SectionTitle subtitle={subtitleEmphasis} title={titleEmphasis} />
      <HorizontalDivider className="mb-16" />
      <div>
        {projects?.map((project) => (
          <div key={project.slug}>
            <ProjectCard viewProjects={viewProjects} project={project} />
            <HorizontalDivider className="my-16" />
          </div>
        ))}
        <p className="flex items-center gap-1.5">
          <span className="font-sans text-gray-800 dark:text-gray-400">
            {text1Emphasis}
          </span>
          <NextLink href="/projects" className="inline-flex font-sans">
            {text2Emphasis}
            <ArrowRight size={18} />
          </NextLink>
        </p>
      </div>
    </section>
  )
}
