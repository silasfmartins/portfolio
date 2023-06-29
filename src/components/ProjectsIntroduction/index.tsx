'use client'

import { SectionTitle } from '../SectionTitle'
import { Link } from '../Link'
import { ArrowLeft } from 'lucide-react'

import { motion } from 'framer-motion'

export function ProjectsIntroduction() {
  return (
    <section className="flex h-[450px] w-full flex-col items-center justify-center bg-slate-200 px-2 dark:bg-[#111e29] lg:h-[630px]">
      <SectionTitle
        subtitle="projetos"
        title="Meus Projetos"
        className="items-center text-center [&>h3]:text-4xl"
      />
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.6 }}
      >
        <p className="my-6 max-w-[640px] text-center font-sans text-sm text-gray-800 dark:text-gray-400 sm:text-base">
          Aqui você poderá ver alguns dos trabalhos que desenvolvi. Navegue à
          vontade e explore os projetos para ver como foram criados, as
          tecnologias utilizadas e as funcionalidades implementadas.
        </p>
        <Link href="/" className="font-sans">
          <ArrowLeft size={20} />
          Voltar para Home
        </Link>
      </motion.div>
    </section>
  )
}
