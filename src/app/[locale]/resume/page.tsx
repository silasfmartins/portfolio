import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense, use } from "react";

import { ResumeDownloads } from "@/components/ResumeDownloads";
import { ResumePreview } from "@/components/ResumePreview";
import { SectionTitle } from "@/components/SectionTitle";
import {
  getResumeDownloadOptions,
  getResumeHref,
} from "@/lib/resume/downloads";
import { getLanguageAlternates } from "@/lib/site";

interface ResumePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ResumePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Resume" });

  return {
    alternates: { languages: getLanguageAlternates("/resume") },
    description: t("pageText"),
    title: t("pageTitle"),
  };
}

export default function ResumePage({ params }: ResumePageProps) {
  const { locale } = use(params);

  return (
    <Suspense>
      <ResumeContent locale={locale} />
    </Suspense>
  );
}

async function ResumeContent({ locale }: { locale: string }) {
  const [t, tIndex] = await Promise.all([
    getTranslations({ locale, namespace: "Resume" }),
    getTranslations({ locale, namespace: "Index" }),
  ]);

  return (
    <section className="py-16 sm:py-20">
      <div className="container space-y-6">
        <SectionTitle
          as="h1"
          subtitle={t("pageSubtitle")}
          title={t("pageTitle")}
        />
        <p className="text-muted-foreground max-w-2xl leading-relaxed">
          {t("pageText")}
        </p>

        <ResumeDownloads
          label={tIndex("downloadResume")}
          options={getResumeDownloadOptions((language) =>
            tIndex("downloadResumeIn", { language })
          )}
        />

        <ResumePreview
          copy={{
            noPreview: t("noPreview"),
            openPdf: t("openPdf"),
            previewTitle: t("previewTitle"),
          }}
          href={getResumeHref(locale, true)}
        />
      </div>
    </section>
  );
}
