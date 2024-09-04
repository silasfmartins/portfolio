'use client'

import { ReactNode } from 'react'

import { ThemeProvider } from 'next-themes'

import { Header } from '@/components/Header'
import { BackToTop } from '@/components/BackToTop'
import { ContactForm } from '@/components/ContactForm'
import { Toaster } from '@/components/Toaster'
import { Footer } from '@/components/Footer'

interface ProvidersParams {
  children: ReactNode
  indexHeader: string
  projectsHeader: string,
  titleContactForm: string,
  subtitleContactForm: string,
  messageSuccess: string,
  messageError: string,
  nameMessage: string,
  textMessage: string,
  buttonSent: string,
  buttonSend: string,
  rightsReserved: string,
  madeBy: string
}

export function Providers({ children, indexHeader, projectsHeader, titleContactForm, subtitleContactForm, messageSuccess, messageError, nameMessage, textMessage, buttonSent, buttonSend, rightsReserved, madeBy }: ProvidersParams) {
  return (
    <ThemeProvider attribute="class">
      <div className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <Header indexHeader={indexHeader} projectsHeader={projectsHeader} />
        {children}
        <BackToTop />
        <ContactForm titleContactForm={titleContactForm} subtitleContactForm={subtitleContactForm} messageSuccess={messageSuccess} messageError={messageError} nameMessage={nameMessage} textMessage={textMessage} buttonSent={buttonSent} buttonSend={buttonSend} />
        <Toaster />
        <Footer madeBy={madeBy} rightsReserved={rightsReserved} />
      </div>
    </ThemeProvider>
  )
}
