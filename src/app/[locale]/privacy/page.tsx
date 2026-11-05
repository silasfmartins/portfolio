import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense, use } from "react";

const CONTACT_EMAIL = "silas.martins2041@gmail.com";
const SECTIONS = ["collected", "use", "browser", "rights"] as const;

export const metadata: Metadata = {
  title: "Privacidade",
};

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

export default function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = use(params);

  return (
    <Suspense>
      <PrivacyContent locale={locale} />
    </Suspense>
  );
}

async function PrivacyContent({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "Privacy" });

  return (
    <section className="py-16 sm:py-20">
      <div className="container max-w-3xl space-y-8">
        <header>
          <h1 className="font-display text-foreground text-4xl font-semibold">
            {t("title")}
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">{t("updatedAt")}</p>
        </header>

        {SECTIONS.map((section) => (
          <div className="space-y-2" key={section}>
            <h2 className="text-foreground text-lg font-semibold">
              {t(`${section}Title`)}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t(`${section}Text`, { email: CONTACT_EMAIL })}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
