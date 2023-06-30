'use client'

import { AcademicEducation } from '@/types/about'
import { SectionTitle } from '../SectionTitle'
import { SoftSkills } from './KnowEducation'
import { motion } from 'framer-motion'

interface AboutProps {
  academicEducation: AcademicEducation[]
}

export function About({ academicEducation }: AboutProps) {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-6 py-16">
      <SectionTitle subtitle="sobre" title="Formação Acadêmica" />
      <div className="mt-[60px] grid w-full grid-cols-[repeat(auto-fit,minmax(264px,1fr))] gap-3">
        {academicEducation.map((education, i) => (
          <motion.div
            key={education.name}
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.15, delay: i * 0.1 }}
          >
            <SoftSkills />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
