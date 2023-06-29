import NextLink from 'next/link'
import { ComponentProps } from 'react'

import clsx from 'clsx'

type LinkProps = ComponentProps<typeof NextLink>

export function Link({ className, children, ...props }: LinkProps) {
  return (
    <NextLink
      className={clsx(
        'flex items-center gap-2 text-sm text-gray-800 transition-colors hover:text-emerald-900 dark:text-gray-300 dark:hover:text-emerald-500',
        className,
      )}
      {...props}
    >
      {children}
    </NextLink>
  )
}
