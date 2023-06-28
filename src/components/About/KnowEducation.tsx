import Image from 'next/image'
import { AcademicEducation } from '@/types/about'

interface KnowEductionProps {
  education: AcademicEducation
}

export function KnowEducation({ education }: KnowEductionProps) {
  return (
    <div className="flex gap-8 rounded-lg bg-gray-600/20 p-6 text-gray-500 transition-all hover:bg-gray-600/30 hover:text-emerald-500">
      <div className="flex flex-col">
        <h1 className="font-sans text-sm font-bold text-black dark:text-white lg:text-lg">
          {education.name}
        </h1>
        <span className="font-sans text-sm lg:text-base">
          {education.institution}
        </span>
        <span className="font-sans">{education.date}</span>
      </div>
      <Image
        className="rounded-lg"
        src={education.image.url}
        alt={education.imageAlt}
        width={84}
        height={84}
      />
    </div>
  )
}
