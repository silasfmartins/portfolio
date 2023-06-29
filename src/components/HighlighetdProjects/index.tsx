import { Project } from '@/types/projects'

import { SectionTitle } from '../SectionTitle'
import { HorizontalDivider } from '../HorizontalDivider'
import { ProjectCard } from './ProjectCard'
import { Link } from '../Link'
import { ArrowRight } from 'lucide-react'

interface HighlighetdProjectsProps {
  projects: Project[]
}

export function HighlighetdProjects({ projects }: HighlighetdProjectsProps) {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-6 py-16">
      <SectionTitle subtitle="destaques" title="Projetos em destaque" />
      <HorizontalDivider className="mb-16" />
      <div>
        {projects?.map((project) => (
          <div key={project.slug}>
            <ProjectCard project={project} />
            <HorizontalDivider className="my-16" />
          </div>
        ))}
        <p className="flex items-center gap-1.5">
          <span className="font-sans text-gray-800 dark:text-gray-400">
            Se interessou?
          </span>
          <Link href="/projects" className="inline-flex font-sans">
            Ver todos
            <ArrowRight size={18} />
          </Link>
        </p>
      </div>
    </section>
  )
}
