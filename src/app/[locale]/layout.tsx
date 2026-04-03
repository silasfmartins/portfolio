import "./globals.css";

import type { Metadata } from "next";
import { JetBrains_Mono, Manrope } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { cache, type ReactNode, Suspense, use } from "react";
import {
  ContactFormFields,
  ContactFormForm,
  ContactFormPanel,
  ContactFormRoot,
  ContactFormSubmitButton,
  ContactFormTitle,
} from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { routing } from "@/i18n/routing";
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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = use(params);
  return (
    <html data-scroll-behavior="smooth" lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          manrope.variable,
          jetBrainsMono.variable,
          "min-h-screen font-sans"
        )}
      >
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <LocaleProviders locale={locale}>{children}</LocaleProviders>
        </Suspense>
      </body>
    </html>
  );
}

interface LocaleProvidersProps {
  children: ReactNode;
  locale: string;
}

const getLocaleI18nBundle = cache(async (_locale: string) =>
  Promise.all([
    getMessages(),
    getTranslations("Header"),
    getTranslations("ContactForm"),
    getTranslations("Footer"),
  ])
);

function LocaleProviders({ children, locale }: LocaleProvidersProps) {
  setRequestLocale(locale);

  const [messages, tHeader, tContactForm, tFooter] = use(
    getLocaleI18nBundle(locale)
  );

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Providers>
        <Header
          indexHeader={tHeader("home")}
          projectsHeader={tHeader("projects")}
        />
        <main className="relative">{children}</main>
        <ContactFormRoot
          copy={{
            buttons: {
              send: tContactForm("buttonSend"),
              sent: tContactForm("buttonSent"),
            },
            fields: {
              namePlaceholder: tContactForm("nameMessage"),
              messagePlaceholder: tContactForm("textMessage"),
              emailPlaceholder: "Email",
            },
            feedback: {
              successMessage: tContactForm("messageSuccess"),
              errorMessage: tContactForm("messageError"),
            },
          }}
        >
          <ContactFormTitle
            subtitle={tContactForm("subtitleContactForm")}
            title={tContactForm("titleContactForm")}
          />
          <ContactFormPanel>
            <ContactFormForm>
              <ContactFormFields />
              <ContactFormSubmitButton />
            </ContactFormForm>
          </ContactFormPanel>
        </ContactFormRoot>
        <Footer
          madeBy={tFooter("madeBy")}
          rightsReserved={tFooter("rightsReserved")}
        />
      </Providers>
    </NextIntlClientProvider>
  );
}
