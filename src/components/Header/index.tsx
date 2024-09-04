'use client'

import { Link } from "@/navigation"
import Image from 'next/image'
import { useState } from 'react'

import { ThemeSwitcher } from '../ThemeSwitcher'
import { NavItem } from './NavItem'

import Logo from '../../assets/logo.png'
import { AlignJustify } from 'lucide-react'

import { motion } from 'framer-motion'
import LocalSwitcher from "../LocalSwitcher"

const NAV_ITEMS = [
  {
    label: '',
    href: '/',
  },
  {
    label: '',
    href: '/projects',
  },
]

interface HeaderParams {
  indexHeader: string
  projectsHeader: string
}

export function Header({ indexHeader, projectsHeader }: HeaderParams) {
  const [menu, setMenu] = useState(false)

  if (indexHeader == 'Home') {
    NAV_ITEMS[0].label = 'Home'
  } else if (indexHeader == 'Página Inicial') {
    NAV_ITEMS[0].label = 'Página Inicial'
  }

  if (projectsHeader == 'Projetos') {
    NAV_ITEMS[1].label = 'Projetos'
  } else if (projectsHeader == 'Projects') {
    NAV_ITEMS[1].label = 'Projects'
  }

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
          <LocalSwitcher />
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
              : 'absolute mt-96 flex w-full flex-col gap-10 border-b-[1px] border-solid border-slate-300 bg-slate-200 px-6 pb-4 dark:border-[#112329] dark:bg-[#111e29]'
          }
        >
          {NAV_ITEMS.map((item) => (
            <NavItem {...item} key={item.label} />
          ))}
          <LocalSwitcher />
          <ThemeSwitcher />
        </nav>
      </div>
    </motion.header>
  )
}
