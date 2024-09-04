'use client'

import { KnownTech as IKnownTech } from '@/types/projects'
import { SectionTitle } from '../SectionTitle'
import { KnowTech } from './KnowTech'
import { motion } from 'framer-motion'

interface KnowTechsProps {
  titleKnow: any
  subtitleKnow: any,
  locale: string,
  skillTime: string,
  skillTimeRemove: string,
  techs: IKnownTech[]
}

export function KnowTechs({ titleKnow, subtitleKnow, techs, locale, skillTime, skillTimeRemove }: KnowTechsProps) {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-6 py-16">
      <SectionTitle subtitle={subtitleKnow} title={titleKnow} />
      <div className="mt-[60px] grid w-full grid-cols-[repeat(auto-fit,minmax(264px,1fr))] gap-3">
        {techs?.map((tech, i) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.15, delay: i * 0.1 }}
          >
            <KnowTech skillTimeRemove={skillTimeRemove} locale={locale} skillTime={skillTime} tech={tech} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
