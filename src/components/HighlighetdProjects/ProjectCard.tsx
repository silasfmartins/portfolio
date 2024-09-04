'use client'

import Image from 'next/image'

import { Project } from '@/types/projects'

import Icone from '../../assets/project-title-icon.svg'

import { TechBadge } from '../TechBadge'
import { NextLink } from '../Link'

import { ArrowRight } from 'lucide-react'

import { motion } from 'framer-motion'
import { fadeUpAnimation, techBadgeAnimation } from '@/lib/animations'

interface ProjectCardProps {
  viewProjects: string
  project: Project
}

export function ProjectCard({ project, viewProjects }: ProjectCardProps) {
  return (
    <motion.div
      className="flex flex-col gap-6 lg:flex-row lg:gap-12"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="h-[200px] w-full sm:h-[300px] lg:min-h-full lg:w-[420px]"
        initial={{ opacity: 0, y: 100, scale: 0.5 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 100, scale: 0.5 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Image
          width={420}
          height={304}
          src={project.thumbnail.url}
          alt={`Thumbnail do Projeto ${project.title}`}
          className="h-full w-full rounded-lg object-cover"
        />
      </motion.div>
      <div className="flex-1 lg:py-[18px]">
        <motion.h3
          className="flex items-center gap-3 font-sans text-lg font-medium text-gray-950 dark:text-gray-50"
          {...fadeUpAnimation}
          transition={{ duration: 0.7 }}
        >
          <Image
            width={20}
            height={20}
            src={Icone}
            alt="Ícone do Portfólio. Ele é verde, são dois retângulos um sobre o outro na diagonal."
          />
          {project.title}
        </motion.h3>
        <motion.p
          className="my-6 font-sans text-gray-800 dark:text-gray-400"
          {...fadeUpAnimation}
          transition={{ duration: 0.2, delay: 0.3 }}
        >
          {project.shortDescription}
        </motion.p>
        <div className="mb-8 flex flex-wrap gap-x-2 gap-y-3 font-sans lg:max-w-[350px]">
          {project.technologies.map((tech, i) => (
            <TechBadge
              key={`${project.title}-tech-${tech.name}`}
              name={tech.name}
              {...techBadgeAnimation}
              transition={{ duration: 0.2, delay: 0.5 + i * 0.1 }}
            />
          ))}
        </div>
        <NextLink className="font-sans" href={`/projects/${project.slug}`}>
          {viewProjects}
          <ArrowRight size={18} />
        </NextLink>
      </div>
    </motion.div>
  )
}
