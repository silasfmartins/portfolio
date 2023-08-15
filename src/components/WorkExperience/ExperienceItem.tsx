'use client'

import Image from 'next/image'

import { WorkExperience } from '@/types/page-info'

import { differenceInMonths, differenceInYears, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { motion } from 'framer-motion'
import { RichText } from '../RichText'

interface ExperienceItemProps {
  experience: WorkExperience
}

export function ExperienceItem({ experience }: ExperienceItemProps) {
  const { endDate, companyName, companyLogo, companyUrl, description, role } =
    experience

  const startDate = new Date(experience.startDate)

  const formattedStartDate = format(startDate, 'MMM yyyy', { locale: ptBR })
  const formattedEndDate = endDate
    ? format(new Date(endDate), 'MMM yyyy', { locale: ptBR })
    : 'o momento'

  const end = endDate ? new Date(endDate) : new Date()

  const months = differenceInMonths(end, startDate)
  const years = differenceInYears(end, startDate)
  const monthsRemaining = months % 12

  const formattedDuration =
    years > 0
      ? `${years} ano${years > 1 ? 's' : ''}${
          monthsRemaining > 0
            ? ` e ${monthsRemaining} mes${monthsRemaining > 1 ? 'es' : ''}`
            : ''
        }`
      : `${months} mes${months > 1 ? 'es' : ''}`

  return (
    <motion.div
      className="grid grid-cols-[40px,1fr] gap-4 font-sans md:gap-10"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="rounded-full border border-gray-900 p-0.5 dark:border-gray-500">
          <Image
            src={companyLogo.url}
            alt={`Logo da instituição ${companyName}`}
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
        <div className="h-full w-[1px] bg-gray-400 dark:bg-gray-800" />
      </div>
      <div>
        <div className="flex flex-col gap-2 text-sm sm:text-base">
          <a
            href={companyUrl}
            target="_blank"
            className="text-gray-900 transition-colors hover:text-emerald-900 dark:text-gray-500 dark:hover:text-emerald-500"
            rel="noreferrer"
          >
            @ {companyName}
          </a>
          <h4 className="text-gray-700 dark:text-gray-300">{role}</h4>
          <span className="text-gray-900 dark:text-gray-500">
            {formattedStartDate} • {formattedEndDate} • ({formattedDuration})
          </span>
          <div className="text-gray-800 dark:text-gray-400">
            <RichText content={description.raw} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
