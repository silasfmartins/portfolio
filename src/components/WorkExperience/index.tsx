import { WorkExperience as IWorkExperience } from '@/types/page-info'

import { SectionTitle } from '../SectionTitle'
import { ExperienceItem } from './ExperienceItem'

interface WorkExperienceProps {
  experiences: IWorkExperience[]
}

export function WorkExperience({ experiences }: WorkExperienceProps) {
  return (
    <section className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-6 py-16 md:flex-row md:gap-4 lg:gap-16">
      <div className="max-w-[420px]">
        <SectionTitle
          subtitle="experiências"
          title="Experiência Profissional"
        />
        <p className="mt-6 font-sans text-gray-800 dark:text-gray-400">
          Fico feliz em sempre poder ter trabalhado nas melhores empresas do
          Brasil e do mundo.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {experiences?.map((experience) => (
          <ExperienceItem
            key={experience.companyName}
            experience={experience}
          />
        ))}
      </div>
    </section>
  )
}
