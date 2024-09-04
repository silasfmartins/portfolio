import { About as IAbout } from '@/types/page-info'

import { SectionTitle } from '../SectionTitle'
import { AboutItem } from './AboutItem'

interface AboutProps {
  titleAbout: string,
  subtitleAbout: string,
  textAbout: string,
  locale: string,
  about: IAbout[]
}

export function About({ titleAbout, subtitleAbout, textAbout, locale, about }: AboutProps) {
  return (
    <section className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-6 py-16 md:flex-row md:gap-4 lg:gap-16">
      <div className="max-w-[420px]">
        <SectionTitle subtitle={subtitleAbout} title={titleAbout} />
        <p className="mt-6 font-sans text-gray-800 dark:text-gray-400">
          {textAbout}
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {about?.map((experience) => (
          <AboutItem locale={locale} key={experience.companyName} about={experience} />
        ))}
      </div>
    </section>
  )
}
