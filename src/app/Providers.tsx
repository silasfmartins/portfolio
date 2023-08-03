'use client'

import { ReactNode } from 'react'

import { ThemeProvider } from 'next-themes'

import { Header } from '@/components/Header'
import { BackToTop } from '@/components/BackToTop'
import { ContactForm } from '@/components/ContactForm'
import { Toaster } from '@/components/Toaster'
import { Footer } from '@/components/Footer'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      <div className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <Header />
        {children}
        <BackToTop />
        <ContactForm />
        <Toaster />
        <Footer />
      </div>
    </ThemeProvider>
  )
}
