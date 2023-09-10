import { twMerge } from 'tailwind-merge'

interface HorizontalDividerProps {
  className?: string
}

export function HorizontalDivider({ className }: HorizontalDividerProps) {
  return (
    <div
      className={twMerge(
        'my-8 w-full border-b border-b-gray-300 dark:border-b-gray-800',
        className,
      )}
    />
  )
}
