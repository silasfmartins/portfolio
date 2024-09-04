import { Link } from "@/navigation"
import { ComponentProps } from 'react'

import { twMerge } from 'tailwind-merge'

type LinkProps = ComponentProps<typeof Link>

export function NextLink({ className, children, ...props }: LinkProps) {
  return (
    <Link
      className={twMerge(
        'flex items-center gap-2 text-sm text-gray-800 transition-colors hover:text-emerald-900 dark:text-gray-300 dark:hover:text-emerald-500',
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  )
}
