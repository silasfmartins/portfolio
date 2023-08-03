'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

import { ThemeSwitcher } from '../ThemeSwitcher'
import { NavItem } from './NavItem'

import Logo from '../../assets/logo.png'
import { AlignJustify } from 'lucide-react'

import { motion } from 'framer-motion'

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
  const [menu, setMenu] = useState(false)

  function showMenu() {
    setMenu(!menu)
  }

  return (
    <motion.header
      className="absolute top-0 z-10 flex h-24 w-full items-center justify-center bg-slate-200 dark:bg-[#111e29]"
      initial={{ top: -100 }}
      animate={{ top: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto hidden w-full max-w-[1200px] items-center justify-between px-6 lg:flex">
        <Link href="/">
          <Image src={Logo} width={58} height={58} alt="Logo Silas Martins" />
        </Link>
        <div className="flex items-center gap-10">
          <nav className="flex items-center gap-4 sm:gap-10">
            {NAV_ITEMS.map((item) => (
              <NavItem {...item} key={item.label} />
            ))}
          </nav>
          <ThemeSwitcher />
        </div>
      </div>
      <div className="flex w-full items-center justify-between lg:hidden">
        <div className="flex w-full items-center justify-between px-6">
          <Link href="/">
            <Image
              src={Logo}
              width={58}
              height={58}
              alt="Logo Silas Martins. Tem um fundo preto, é um S que do lado esquerdo é branco tem um risco um pouco depois do centro e na direita depois do risco é verde. A logo é levemente arredondada"
            />
          </Link>
          <button className="cursor-pointer" onClick={showMenu}>
            {menu !== true ? (
              <AlignJustify color="rgb(16 185 129)" size={34} />
            ) : (
              <span className="font-sans text-3xl text-emerald-500 hover:text-emerald-600">
                X
              </span>
            )}
          </button>
        </div>
        <nav
          className={
            menu !== true
              ? 'hidden'
              : 'absolute mt-72 flex w-full flex-col gap-10 border-b-[1px] border-solid border-slate-300 bg-slate-200 px-6 pb-4 dark:border-[#112329] dark:bg-[#111e29]'
          }
        >
          {NAV_ITEMS.map((item) => (
            <NavItem {...item} key={item.label} />
          ))}
          <ThemeSwitcher />
        </nav>
      </div>
    </motion.header>
  )
}
