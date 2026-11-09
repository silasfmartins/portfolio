import "./globals.css";

import type { Metadata, Viewport } from "next";
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
import type { QuickItem } from "@/components/Header/QuickSearch";
import { LayoutShellSkeleton } from "@/components/Skeletons/LayoutShellSkeleton";
import { cn } from "@/components/ui";
import { routing } from "@/i18n/routing";
import { getProjectsPageDataForRequest } from "@/lib/projects-data";
import { getLanguageAlternates, SITE_NAME, SITE_URL } from "@/lib/site";
import { themeInitScript } from "@/lib/theme";
import { Providers } from "./Providers";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export async function generateMetadata({
  params,
}: Pick<RootLayoutProps, "params">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const description = t("siteDescription");

  return {
    alternates: { languages: getLanguageAlternates() },
    description,
    icons: {
      apple: "/icons/apple-icon.png",
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
    },
    metadataBase: new URL(SITE_URL),
    openGraph: {
      description,
      images: ["/og.png"],
      siteName: SITE_NAME,
      title: SITE_NAME,
      type: "website",
    },
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { color: "#f4f7fa", media: "(prefers-color-scheme: light)" },
    { color: "#0f131a", media: "(prefers-color-scheme: dark)" },
  ],
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
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={cn(
          manrope.variable,
          jetBrainsMono.variable,
          "min-h-screen font-sans"
        )}
      >
        <Suspense fallback={<LayoutShellSkeleton locale={locale} />}>
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
    getProjectsPageDataForRequest(_locale),
  ])
);

function LocaleProviders({ children, locale }: LocaleProvidersProps) {
  setRequestLocale(locale);

  const [messages, tHeader, tContactForm, tFooter, { projects }] = use(
    getLocaleI18nBundle(locale)
  );
  const searchItems: QuickItem[] = [
    {
      description: tHeader("homeDescription"),
      group: "pages",
      href: "/",
      icon: "home",
      label: tHeader("home"),
    },
    {
      description: tHeader("projectsDescription"),
      group: "pages",
      href: "/projects",
      icon: "projects",
      label: tHeader("projects"),
    },
    {
      description: tHeader("contactDescription"),
      group: "pages",
      href: "/#contact",
      icon: "contact",
      label: tHeader("contact"),
    },
    {
      description: tHeader("privacyDescription"),
      group: "pages",
      href: "/privacy",
      icon: "privacy",
      label: tFooter("privacy"),
    },
    ...projects.map(
      (project): QuickItem => ({
        description: project.technologies.map(({ name }) => name).join(" • "),
        group: "projects",
        href: `/projects/${project.slug}`,
        label: project.title || project.slug,
        thumbnail: project.thumbnail?.url,
      })
    ),
  ];

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Providers>
        <a
          className="bg-primary text-primary-foreground sr-only z-50 rounded-lg px-4 py-2 focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
          href="#main"
        >
          {tHeader("skipToContent")}
        </a>
        <Header
          indexHeader={tHeader("home")}
          projectsHeader={tHeader("projects")}
          searchItems={searchItems}
        />
        <main className="relative" id="main">
          {children}
        </main>
        <ContactFormRoot
          copy={{
            buttons: {
              send: tContactForm("buttonSend"),
              sent: tContactForm("buttonSent"),
            },
            errors: {
              email: tContactForm("errorEmail"),
              message: tContactForm("errorMessage"),
              name: tContactForm("errorName"),
            },
            feedback: {
              errorMessage: tContactForm("messageError"),
              successMessage: tContactForm("messageSuccess"),
            },
            fields: {
              email: "Email",
              message: tContactForm("textMessage"),
              name: tContactForm("nameMessage"),
            },
            privacy: {
              link: tContactForm("privacyLink"),
              notice: tContactForm("privacyNotice"),
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
          privacy={tFooter("privacy")}
          rightsReserved={tFooter("rightsReserved")}
        />
      </Providers>
    </NextIntlClientProvider>
  );
}
