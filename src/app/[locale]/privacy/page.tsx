import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense, use } from "react";

import { getLanguageAlternates } from "@/lib/site";

const CONTACT_EMAIL = "silas.martins2041@gmail.com";

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Privacy" });

  return {
    alternates: { languages: getLanguageAlternates("/privacy") },
    title: t("title"),
  };
}

export default function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = use(params);

  return (
    <Suspense>
      <PrivacyContent locale={locale} />
    </Suspense>
  );
}

function PrivacyList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-1.5 pl-5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

async function PrivacyContent({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "Privacy" });
  const email = { email: CONTACT_EMAIL };

  return (
    <section className="py-16 sm:py-20">
      <div className="text-muted-foreground [&_h2]:text-foreground container max-w-3xl space-y-8 leading-relaxed [&_h2]:mb-2 [&_h2]:text-lg [&_h2]:font-semibold [&_p]:mt-2">
        <header>
          <h1 className="font-display text-foreground text-4xl font-semibold">
            {t("title")}
          </h1>
          <p className="text-sm">{t("updatedAt")}</p>
          <p>{t("intro")}</p>
        </header>

        <div>
          <h2>{t("controllerTitle")}</h2>
          <p>{t("controllerText", email)}</p>
        </div>

        <div>
          <h2>{t("dataTitle")}</h2>
          <PrivacyList items={t.raw("dataItems")} />
          <p>{t("dataNote")}</p>
        </div>

        <div>
          <h2>{t("cookiesTitle")}</h2>
          <PrivacyList items={t.raw("cookiesItems")} />
          <p>{t("cookiesNote")}</p>
        </div>

        <div>
          <h2>{t("sharingTitle")}</h2>
          <PrivacyList items={t.raw("sharingItems")} />
          <p>{t("sharingNote")}</p>
        </div>

        <div>
          <h2>{t("transferTitle")}</h2>
          <p>{t("transferText")}</p>
        </div>

        <div>
          <h2>{t("retentionTitle")}</h2>
          <PrivacyList items={t.raw("retentionItems")} />
        </div>

        <div>
          <h2>{t("rightsTitle")}</h2>
          <p>{t("rightsText")}</p>
          <PrivacyList items={t.raw("rightsItems")} />
          <p>{t("rightsNote", email)}</p>
        </div>

        <div>
          <h2>{t("securityTitle")}</h2>
          <p>{t("securityText")}</p>
        </div>

        <div>
          <h2>{t("changesTitle")}</h2>
          <p>{t("changesText")}</p>
        </div>
      </div>
    </section>
  );
}
