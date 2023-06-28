'use client'

import { KnownTech as IKnownTech } from '@/types/projects'
import { SectionTitle } from '../SectionTitle'
import { KnowTech } from './KnowTech'
import { motion } from 'framer-motion'

interface KnowTechsProps {
  techs: IKnownTech[]
}

export function KnowTechs({ techs }: KnowTechsProps) {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-6 py-16">
      <SectionTitle subtitle="competências" title="Conhecimentos" />
      <div className="mt-[60px] grid w-full grid-cols-[repeat(auto-fit,minmax(264px,1fr))] gap-3">
        {techs?.map((tech, i) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.15, delay: i * 0.1 }}
          >
            <KnowTech tech={tech} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
