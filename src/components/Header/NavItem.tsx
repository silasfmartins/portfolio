'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import clsx from 'clsx'

interface NavItemProps {
  label: string
  href: string
}

export function NavItem({ label, href }: NavItemProps) {
  const pathname = usePathname()

  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={clsx(
        'flex w-full items-center gap-2 py-4 font-mono font-medium text-gray-500 dark:text-gray-400',
        isActive && 'text-gray-950 dark:text-gray-50',
      )}
    >
      <span className="text-emerald-400">#</span>
      {label}
    </Link>
  )
}
