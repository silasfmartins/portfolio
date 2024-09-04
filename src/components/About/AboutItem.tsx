'use client'

import Image from 'next/image'

import { About } from '@/types/page-info'

import { differenceInMonths, differenceInYears, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import enUS from 'date-fns/locale/en-US'

import { motion } from 'framer-motion'

interface AboutItemProps {
  locale: any,
  about: About
}

export function AboutItem({ locale, about }: AboutItemProps) {
  const { endDate, companyName, companyLogo, companyUrl, role } = about

  const startDate = new Date(about.startDate)

  let theMoment = ''
  let yearsString = ''
  let andDate = ''
  let monthDate = ''
  let monthsDate = ''

  if (locale == 'pt_BR') {
    locale: ptBR
    theMoment = 'o momento'
    yearsString = 'ano'
    andDate = 'e'
    monthDate = 'mes'
    monthsDate = 'es'
  } else {
    locale: enUS
    theMoment = 'the moment'
    yearsString = 'year'
    andDate = 'and'
    monthDate = 'month'
    monthsDate = 's'
  }

  const formattedStartDate = format(startDate, 'MMM yyyy', locale)
  const formattedEndDate = endDate
    ? format(new Date(endDate), 'MMM yyyy', locale)
    : `${theMoment}`

  const end = endDate ? new Date(endDate) : new Date()

  const months = differenceInMonths(end, startDate)
  const years = differenceInYears(end, startDate)
  const monthsRemaining = months % 12

  const formattedDuration =
    years > 0
      ? `${years} ${yearsString}${years > 1 ? 's' : ''}${
          monthsRemaining > 0
            ? ` ${andDate} ${monthsRemaining} ${monthDate}${monthsRemaining > 1 ? `${monthsDate}` : ''}`
            : ''
        }`
      : `${months} ${monthDate}${months > 1 ? `${monthsDate}` : ''}`

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
        </div>
      </div>
    </motion.div>
  )
}
