import { ComponentProps } from 'react'

import { twMerge } from 'tailwind-merge'

type ButtonProps = ComponentProps<'button'>

export function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button
      className={twMerge(
        'flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 font-sans text-gray-50 transition-all hover:bg-emerald-500 disabled:opacity-50',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
