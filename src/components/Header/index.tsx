'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

import LogoDark from '../../assets/logo-dark.png'

import { NavItem } from './NavItem'

const NAV_ITEMS = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Projetos',
    href: '/projects',
  },
]

export function Header() {
  return (
    <motion.header
      className="absolute top-0 z-10 flex h-24 w-full items-center justify-center"
      initial={{ top: -100 }}
      animate={{ top: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-6">
        <Link href="/">
          <Image
            src={LogoDark}
            width={58}
            height={58}
            alt="Logo Silas Martins"
          />
        </Link>
        <nav className="flex items-center gap-4 sm:gap-10">
          {NAV_ITEMS.map((item) => (
            <NavItem {...item} key={item.label} />
          ))}
        </nav>
      </div>
    </motion.header>
  )
}
