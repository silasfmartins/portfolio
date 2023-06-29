'use client'

import Image from 'next/image'
import { ProjectSection } from '@/types/projects'

import { motion } from 'framer-motion'
import { fadeUpAnimation } from '@/lib/animations'

interface ProjectSectionsProps {
  sections: ProjectSection[]
}

export function ProjectSections({ sections }: ProjectSectionsProps) {
  return (
    <section className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 px-6 md:gap-32 md:py-32">
      {sections.map((section) => (
        <motion.div
          key={section.title}
          className="flex flex-col items-center gap-6 md:gap-12"
          {...fadeUpAnimation}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-sans text-2xl text-gray-800 dark:text-gray-300 md:text-3xl">
            {section.title}
          </h2>
          <Image
            width={1080}
            height={672}
            src={section.image.url}
            alt={`Imagem da sessão ${section.title}`}
            className="aspect-auto w-full rounded-lg object-cover"
            unoptimized
          />
        </motion.div>
      ))}
    </section>
  )
}
