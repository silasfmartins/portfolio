import { KnownTech as IKnownTech } from '@/types/projects'
import { getRelativeTimeString } from '../../utils/get-relative-time'
import { CMSIcon } from '../CMSIcon'

interface KnowTechProps {
  tech: IKnownTech
}

export function KnowTech({ tech }: KnowTechProps) {
  const relativeTime = getRelativeTimeString(
    new Date(tech.startDate),
    'pt-BR',
  ).replace('há ', '')
  return (
    <div className="flex flex-col gap-2 rounded-lg bg-gray-400/20 p-6 text-gray-900 transition-all hover:bg-gray-400/30 hover:text-emerald-900 dark:bg-gray-600/20 dark:text-gray-500 dark:hover:bg-gray-600/30 dark:hover:text-emerald-500">
      <div className="flex items-center justify-between">
        <p className="font-sans font-medium">{tech.name}</p>
        <CMSIcon icon={tech.iconSvg} />
      </div>
      <span className="font-sans">{relativeTime} de experiência</span>
    </div>
  )
}
