import "./globals.css";

import type { Metadata } from "next";
import { JetBrains_Mono, Manrope } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Providers } from "./Providers";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Silas Martins",
    template: "%s | Silas Martins",
  },
  description:
    "Portfólio com projetos, experiência e trajetória em tecnologia.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

interface RootLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await getMessages();
  const [tHeader, tContactForm, tFooter] = await Promise.all([
    getTranslations("Header"),
    getTranslations("ContactForm"),
    getTranslations("Footer"),
  ]);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <html
        data-scroll-behavior="smooth"
        lang={locale}
        suppressHydrationWarning
      >
        <body
          className={cn(
            manrope.variable,
            jetBrainsMono.variable,
            "min-h-screen font-sans"
          )}
        >
          <Providers
            contactForm={{
              title: tContactForm("titleContactForm"),
              subtitle: tContactForm("subtitleContactForm"),
              successMessage: tContactForm("messageSuccess"),
              errorMessage: tContactForm("messageError"),
              namePlaceholder: tContactForm("nameMessage"),
              messagePlaceholder: tContactForm("textMessage"),
              sendButton: tContactForm("buttonSend"),
              sentButton: tContactForm("buttonSent"),
            }}
            footer={{
              rightsReserved: tFooter("rightsReserved"),
              madeBy: tFooter("madeBy"),
            }}
            header={{
              home: tHeader("home"),
              projects: tHeader("projects"),
            }}
          >
            {children}
          </Providers>
        </body>
      </html>
    </NextIntlClientProvider>
  );
}
