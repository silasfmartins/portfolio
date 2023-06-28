import './globals.css'
import { ReactNode } from 'react'
import { Inter, IBM_Plex_Mono as IBMPlexMono } from 'next/font/google'
import { Providers } from './Providers'

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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="shortcut icon" href="./favicon.ico" type="image/x-icon" />
      </head>
      <body className={`${inter.variable} ${plexMono.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
