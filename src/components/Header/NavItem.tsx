'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItemProps {
  label: string
  href: string
}

export function NavItem({ label, href }: NavItemProps) {
  const pathname = usePathname()

  const isActive = pathname === href

  return (
    <Link
      data-active={isActive}
      href={href}
      className="flex w-full items-center gap-2 pl-4 font-mono font-medium text-gray-500 data-[active=true]:border-l-2 data-[active=true]:border-solid data-[active=true]:border-emerald-500 data-[active=true]:text-gray-950 dark:text-gray-400 data-[active=true]:dark:text-gray-50 lg:pl-0 data-[active=true]:lg:border-b-2 data-[active=true]:lg:border-l-0"
    >
      <span className="text-emerald-400">#</span>
      {label}
    </Link>
  )
}
