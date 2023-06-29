import { Github, Linkedin, Mail } from 'lucide-react'

const ICONS = [
  {
    icon: <Github />,
    url: 'https://github.com/silasfmartins',
  },
  {
    icon: <Linkedin />,
    url: 'https://www.linkedin.com/in/silas-martins/',
  },
  {
    icon: <Mail />,
    url: 'mailto:silas.martins2041@gmail.com',
  },
]

export function Footer() {
  return (
    <footer className="flex h-14 w-full items-center justify-between bg-gray-50 dark:bg-gray-950">
      <div className="flex max-w-[1200px] flex-col items-center px-24">
        <span className="font-mono text-xs text-gray-800 dark:text-gray-400 sm:text-sm">
          Feito por <strong className="font-medium">Silas Martins</strong> 2023
        </span>
        <span className="font-mono text-xs text-gray-800 dark:text-gray-400 sm:text-sm">
          Todos os direitos reservados
        </span>
      </div>
      <div className="flex items-center gap-5 px-24">
        <div className="flex items-center gap-3 text-2xl text-gray-600">
          {ICONS.map((icon, index) => (
            <a
              href={icon.url}
              key={`contact-${index}`}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-gray-900 dark:hover:text-gray-100"
            >
              {icon.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
