import './globals.css'
import { Inter, IBM_Plex_Mono as IBMPlexMono } from 'next/font/google'
import { Providers } from './Providers'
import { getMessages, getTranslations } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import { ReactNode } from 'react'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const plexMono = IBMPlexMono({
  subsets: ['latin'],
  variable: '--font-plex-mono',
  weight: ['400', '500'],
})

export const metadata = {
  title: {
    default: 'Home',
    template: '%s | Silas Martins',
  },
  icons: [
    {
      url: '/favicon.ico',
    },
  ],
}

interface RootLayoutProps {
  children: ReactNode; 
}

export default async function RootLayout({
   children,
}: Readonly<RootLayoutProps>) {
  const messages = await getMessages();
  const t = await getTranslations("Header")
  const tContactForm = await getTranslations("ContactForm")
  const tFooter = await getTranslations("Footer")
  return (
    <NextIntlClientProvider messages={messages}>
      <html suppressHydrationWarning={true}>
        <head>
          <meta name="author" content="Silas Martins" />
          <link rel="shortcut icon" href="./favicon.ico" type="image/x-icon" />
        </head>
        <body className={`${inter.variable} ${plexMono.variable}`}>
            <Providers indexHeader={t("home")} projectsHeader={t("projects")} titleContactForm={tContactForm("titleContactForm")} subtitleContactForm={tContactForm("subtitleContactForm")} messageSuccess={tContactForm("messageSuccess")} messageError={tContactForm("messageError")} nameMessage={tContactForm("nameMessage")} textMessage={tContactForm("textMessage")} buttonSend={tContactForm("buttonSend")} buttonSent={tContactForm("buttonSent")} rightsReserved={tFooter("rightsReserved")} madeBy={tFooter("madeBy")}>{children}</Providers>
        </body>
      </html>
    </NextIntlClientProvider>
  )
}
