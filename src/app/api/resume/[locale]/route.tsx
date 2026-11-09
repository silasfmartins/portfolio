import { renderToBuffer } from "@react-pdf/renderer";
import { format } from "date-fns";
import { type NextRequest, NextResponse } from "next/server";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";

import { routing } from "@/i18n/routing";
import { getDateLocale } from "@/lib/date-labels";
import { getHomePageDataForRequest } from "@/lib/home-data";
import { ResumeDocument } from "@/lib/resume/resume-document";
import { SITE_URL } from "@/lib/site";
import { CONTACT_EMAIL, getSocialLabel } from "@/lib/social";

/** Resume PDF generated from the same Hygraph data as the home page. */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  const [{ page }, t, tIndex] = await Promise.all([
    getHomePageDataForRequest(locale),
    getTranslations({ locale, namespace: "Resume" }),
    getTranslations({ locale, namespace: "Index" }),
  ]);
  const siteHost = new URL(SITE_URL).host;
  const today = format(new Date(), "dd/MM/yyyy", {
    locale: getDateLocale(locale),
  });

  const pdf = await renderToBuffer(
    <ResumeDocument
      contacts={[
        { label: CONTACT_EMAIL, url: `mailto:${CONTACT_EMAIL}` },
        { label: siteHost, url: `${SITE_URL}/${locale}` },
        ...page.socials.map((social) => ({
          label: getSocialLabel(social.url),
          url: social.url,
        })),
      ]}
      copy={{
        about: t("about"),
        education: t("education"),
        experience: t("experience"),
        generatedFrom: t("generatedFrom", { date: today, site: siteHost }),
        projects: t("projects"),
        role: tIndex("role"),
        skills: t("skills"),
      }}
      info={page}
      locale={locale}
      siteUrl={SITE_URL}
    />
  );

  return new NextResponse(new Uint8Array(pdf), {
    headers: {
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=86400",
      "Content-Disposition": `attachment; filename="${t("fileName")}"`,
      "Content-Type": "application/pdf",
    },
  });
}
