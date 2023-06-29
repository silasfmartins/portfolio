import clsx from 'clsx'

interface HorizontalDividerProps {
  className?: string
}

export function HorizontalDivider({ className }: HorizontalDividerProps) {
  return (
    <div
      className={clsx(
        'my-8 w-full border-b border-b-gray-300 dark:border-b-gray-800',
        className,
      )}
    />
  )
}
