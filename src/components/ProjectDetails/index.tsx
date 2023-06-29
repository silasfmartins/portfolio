'use client'

import { Project } from '@/types/projects'

import Link from 'next/link'

import { RichText } from '../RichText'
import { TechBadge } from '../TechBadge'
import { Button } from '../Button'

import { Github, Globe, ArrowLeft } from 'lucide-react'

import { motion } from 'framer-motion'
import { fadeUpAnimation, techBadgeAnimation } from '@/lib/animations'

interface ProjectDetailsProps {
  project: Project
}

export function ProjectDetails({ project }: ProjectDetailsProps) {
  const animProps = {
    initial: { opacity: 0, x: -100 },
    whileInView: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  }

  return (
    <section className="relative flex w-full flex-col items-center justify-end overflow-hidden px-6 py-24 pb-10 sm:min-h-[750px] sm:pb-24">
      <motion.div
        className="absolute inset-0"
        style={{
          background: `url(/images/hero-bg.png) no-repeat center/cover, url(${project.pageThumbnail.url}) no-repeat center/cover`,
        }}
        initial={{ opacity: 0, scale: 1.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      />
      <div className="z-[1] flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center sm:[&>h3]:text-4xl">
          <motion.span
            className="font-mono text-sm text-emerald-400"
            {...animProps}
            transition={{ duration: 0.5 }}
          >
            ../Projetos
          </motion.span>
          <motion.h3
            className="font-sans text-3xl font-medium text-gray-50"
            {...animProps}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {project.title}
          </motion.h3>
        </div>
        <motion.div
          className="my-4 max-w-[640px] text-center font-sans text-sm text-gray-400 sm:my-6 sm:text-base"
          {...fadeUpAnimation}
        >
          <RichText content={project.description.raw} />
        </motion.div>
        <div className="flex w-full max-w-[330px] flex-wrap items-center justify-center gap-2 font-sans">
          {project.technologies.map((tech, i) => (
            <TechBadge
              key={tech.name}
              name={tech.name}
              {...techBadgeAnimation}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            />
          ))}
        </div>
        <motion.div
          className="my-6 flex flex-col items-center gap-2 sm:my-12 sm:flex-row sm:gap-4"
          {...fadeUpAnimation}
        >
          {project?.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="min-w-[180px]"
            >
              <Button>
                <Github size={20} />
                Repositório
              </Button>
            </a>
          )}
          {project.liveProjectUrl && (
            <a
              href={project.liveProjectUrl}
              target="_blank"
              rel="noreferrer"
              className="min-w-[180px]"
            >
              <Button>
                <Globe size={20} />
                Projeto Online
              </Button>
            </a>
          )}
        </motion.div>
        <Link
          className="flex items-center gap-2 font-sans text-sm text-gray-300 transition-colors hover:text-emerald-500"
          href="/projects"
        >
          <ArrowLeft size={20} />
          Voltar para projetos
        </Link>
      </div>
    </section>
  )
}
