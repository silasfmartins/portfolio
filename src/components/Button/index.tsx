import clsx from 'clsx'
import { ComponentProps } from 'react'

type ButtonProps = ComponentProps<'button'>

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        'flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 font-sans text-gray-50 transition-all hover:bg-emerald-500 disabled:opacity-50',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
