'use client'

import Image from 'next/image'
import { HomePageInfo } from '@/types/page-info'

import { RichText } from '../RichText'
import { CMSIcon } from '../CMSIcon'
import { TechBadge } from '../TechBadge'
import { Button } from '../Button'

import { ArrowRight, Mail } from 'lucide-react'

import { motion } from 'framer-motion'
import { techBadgeAnimation } from '@/lib/animations'

interface HeroHomeProps {
  homeInfo: HomePageInfo
}

export function HomeHero({ homeInfo }: HeroHomeProps) {
  function handleContact() {
    const contactSection = document.querySelector('#contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="flex w-full flex-col justify-end bg-slate-200 py-32 pb-10 dark:bg-[#111e29] sm:pb-32 lg:pb-[110px]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col-reverse items-center justify-between px-6 lg:flex-row">
        <motion.div
          className="w-full lg:max-w-[530px]"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-sans text-4xl font-medium">Silas Martins</h2>
          <div className="my-6 font-sans text-sm text-gray-800 dark:text-gray-400 sm:text-base">
            <RichText content={homeInfo.introduction.raw} />
          </div>
          <div className="flex flex-wrap gap-x-2 gap-y-3 font-sans lg:max-w-[340px]">
            {homeInfo.technologies.map((tech, i) => (
              <TechBadge
                {...tech}
                key={`intro-tech-${tech.name}`}
                {...techBadgeAnimation}
                transition={{ duration: 0.2, delay: i * 0.1 }}
              />
            ))}
          </div>
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:gap-5 lg:mt-10">
            <Button className="w-max shadow-button" onClick={handleContact}>
              Entre em contato
              <ArrowRight size={18} />
            </Button>
            <div className="flex h-20 items-center gap-3 text-2xl text-gray-600">
              {homeInfo.socials.map((contact, index) => (
                <a
                  href={contact.url}
                  key={`contact-${index}`}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-gray-900 dark:hover:text-gray-100"
                >
                  <CMSIcon icon={contact.iconSvg} />
                </a>
              ))}
              <a
                href="mailto:silas.martins2041@gmail.com"
                target="_blank"
                className="transition-colors hover:text-gray-900 dark:hover:text-gray-100"
                rel="noreferrer"
              >
                <Mail />
              </a>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 200, scale: 0.5 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 200, scale: 0.5 }}
          transition={{ duration: 0.5 }}
          className="origin-center"
        >
          <Image
            width={420}
            height={404}
            src={homeInfo.profilePicture.url}
            alt="Foto de perfil Silas Martins"
            className="mb-6 h-[300px] w-[300px] rounded-lg object-cover shadow-2xl lg:mb-0 lg:h-[404px] lg:w-[420px]"
          />
        </motion.div>
      </div>
    </section>
  )
}
