import { KnownTech as IKnownTech } from '@/types/projects'
import { getRelativeTimeString } from '../../utils/get-relative-time'
import { CMSIcon } from '../CMSIcon'

interface KnowTechProps {
  locale: string,
  skillTime: string,
  skillTimeRemove: string,
  tech: IKnownTech
}

export function KnowTech({ locale, tech, skillTime, skillTimeRemove }: KnowTechProps) {
  if (locale == 'pt_BR') {
    locale = 'pt-BR'
  }
  const relativeTime = getRelativeTimeString(
    new Date(tech.startDate),
    `${locale}`,
  ).replace(`${skillTimeRemove}`, '')
  return (
    <div className="flex flex-col gap-2 rounded-lg bg-gray-400/20 p-6 text-gray-900 transition-all hover:bg-gray-400/30 hover:text-emerald-900 dark:bg-gray-600/20 dark:text-gray-500 dark:hover:bg-gray-600/30 dark:hover:text-emerald-500">
      <div className="flex items-center justify-between">
        <p className="font-sans font-medium">{tech.name}</p>
        <CMSIcon icon={tech.iconSvg} />
      </div>
      <span className="font-sans">{relativeTime} {skillTime}</span>
    </div>
  )
}
