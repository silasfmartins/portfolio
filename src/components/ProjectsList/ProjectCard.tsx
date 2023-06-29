import Image from 'next/image'
import { Project } from '@/types/projects'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const technologies = project.technologies.map((x) => x.name).join(', ')
  return (
    <div className="group flex h-[436px] flex-col overflow-hidden rounded-lg border-2 border-gray-300 bg-gray-300 opacity-70 transition-all hover:border-emerald-900 hover:opacity-100 dark:border-gray-800 dark:bg-gray-800 dark:hover:border-emerald-500">
      <div className="h-48 w-full overflow-hidden">
        <Image
          width={380}
          height={200}
          src={project.thumbnail.url}
          alt={`Thumbnail do projeto ${project.title}`}
          unoptimized
          className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
        />
      </div>
      <div className="flex flex-1 flex-col p-8">
        <strong className="font-sans font-medium text-gray-950/90 transition-all group-hover:text-emerald-900 dark:text-gray-50/90 dark:group-hover:text-emerald-500">
          {project.title}
        </strong>
        <p className="mt-2 line-clamp-4 font-sans text-gray-800 dark:text-gray-400">
          {project.shortDescription}
        </p>
        <span className="mt-auto block truncate font-sans text-sm text-gray-800 dark:text-gray-300">
          {technologies}
        </span>
      </div>
    </div>
  )
}
