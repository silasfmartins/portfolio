'use client'

import Link from 'next/link'

import { Project } from '@/types/projects'
import { ProjectCard } from './ProjectCard'

import { motion } from 'framer-motion'
import { fadeUpAnimation } from '@/lib/animations'

interface ProjectsListProps {
  projects: Project[]
}

export function ProjectsList({ projects }: ProjectsListProps) {
  return (
    <section className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-x-4 gap-y-6 px-6 py-32 sm:grid-cols-[repeat(auto-fit,minmax(350px,1fr))]">
      {projects.map((project, i) => (
        <motion.div
          key={project.title}
          {...fadeUpAnimation}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        >
          <Link href={`/projects/${project.slug}`}>
            <ProjectCard project={project} />
          </Link>
        </motion.div>
      ))}
    </section>
  )
}
