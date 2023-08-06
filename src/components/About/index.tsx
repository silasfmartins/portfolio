import { About as IAbout } from '@/types/page-info'

import { SectionTitle } from '../SectionTitle'
import { AboutItem } from './AboutItem'

interface AboutProps {
  about: IAbout[]
}

export function About({ about }: AboutProps) {
  return (
    <section className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-6 py-16 md:flex-row md:gap-4 lg:gap-16">
      <div className="max-w-[420px]">
        <SectionTitle subtitle="sobre" title="Formação Acadêmica" />
        <p className="mt-6 font-sans text-gray-800 dark:text-gray-400">
          Estou sempre buscando as melhores oportunidades e tentando aprender
          cada vez mais.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {about?.map((experience) => (
          <AboutItem key={experience.companyName} about={experience} />
        ))}
      </div>
    </section>
  )
}
