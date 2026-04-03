"use client";

import type { ReactNode } from "react";
import { BackToTop } from "@/components/BackToTop";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Toaster } from "@/components/Toaster";
import { ThemeProvider } from "@/components/theme-provider";

interface ProvidersParams {
  children: ReactNode;
  contactForm: {
    title: string;
    subtitle: string;
    successMessage: string;
    errorMessage: string;
    namePlaceholder: string;
    messagePlaceholder: string;
    sentButton: string;
    sendButton: string;
  };
  footer: {
    rightsReserved: string;
    madeBy: string;
  };
  header: {
    home: string;
    projects: string;
  };
}

export function Providers({
  children,
  header,
  contactForm,
  footer,
}: ProvidersParams) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableSystem
    >
      <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-mesh" />
        <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-90 w-90 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl md:h-130 md:w-130" />

        <Header indexHeader={header.home} projectsHeader={header.projects} />

        <main className="relative">{children}</main>

        <ContactForm
          buttonSend={contactForm.sendButton}
          buttonSent={contactForm.sentButton}
          messageError={contactForm.errorMessage}
          messageSuccess={contactForm.successMessage}
          nameMessage={contactForm.namePlaceholder}
          subtitleContactForm={contactForm.subtitle}
          textMessage={contactForm.messagePlaceholder}
          titleContactForm={contactForm.title}
        />

        <Footer madeBy={footer.madeBy} rightsReserved={footer.rightsReserved} />
        <BackToTop />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}
