import { renderToBuffer } from "@react-pdf/renderer";
import { format } from "date-fns";
import { type NextRequest, NextResponse } from "next/server";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";

import { routing } from "@/i18n/routing";
import { getAgeLabel, getDateLocale } from "@/lib/date-labels";
import { getHomePageDataForRequest } from "@/lib/home-data";
import { COURSES } from "@/lib/resume/courses";
import { ModernResumeDocument } from "@/lib/resume/modern-resume-document";
import { getResumeContent } from "@/lib/resume/resume-content";
import type {
  ResumeContact,
  ResumeDocumentProps,
  ResumeFit,
  ResumePhoto,
} from "@/lib/resume/resume-shared";
import { isResumeStyle, type ResumeStyle } from "@/lib/resume/resume-styles";
import { SimpleResumeDocument } from "@/lib/resume/simple-resume-document";
import { SITE_URL } from "@/lib/site";
import { CONTACT_EMAIL } from "@/lib/social";
import type { Social } from "@/types/page-info";

const MAX_PAGES = 1;
const PAGE_OBJECT = /\/Type \/Page\b(?!s)/gu;
// From the fullest resume to the tightest one; the first that fits on one page is served.
const FITS: ResumeFit[] = [
  { maxProjects: 3, projectDescriptions: true },
  { maxProjects: 3, projectDescriptions: false },
  { maxProjects: 2, projectDescriptions: false },
  { maxProjects: 1, projectDescriptions: false },
];
const HYGRAPH_ASSET =
  /^(?<base>https:\/\/[^/]+\.graphassets\.com\/[^/]+)\/(?<handle>[^/]+)$/u;
const TRAILING_SLASH = /\/$/u;
const SOCIAL_ICONS: Record<string, string> = {
  "github.com": "GH",
  "linkedin.com": "in",
};

/**
 * The PDF only takes PNG or JPEG, and the CMS original is a large PNG: Hygraph crops it to a
 * small square JPEG. It is downloaded here so a failure shows the initials instead of breaking
 * the PDF. The sample content (local path) has no photo either.
 */
async function getPhoto(url: string | undefined): Promise<ResumePhoto | null> {
  const groups = url?.match(HYGRAPH_ASSET)?.groups;

  if (!groups) {
    return null;
  }

  try {
    const response = await fetch(
      `${groups.base}/resize=fit:crop,height:400,width:400/output=format:jpg/${groups.handle}`,
      { next: { revalidate: 60 * 60 * 24 } }
    );
    return response.ok
      ? { data: Buffer.from(await response.arrayBuffer()), format: "jpg" }
      : null;
  } catch {
    return null;
  }
}

/** `https://www.linkedin.com/in/name/` → `linkedin.com/in/name`. */
function shortUrl(url: string) {
  const { hostname, pathname } = new URL(url);
  return `${hostname.replace("www.", "")}${pathname}`.replace(
    TRAILING_SLASH,
    ""
  );
}

function getContacts(socials: Social[], locale: string): ResumeContact[] {
  const profiles = socials.flatMap((social) => {
    const icon = SOCIAL_ICONS[new URL(social.url).hostname.replace("www.", "")];
    return icon ? [{ icon, label: shortUrl(social.url), url: social.url }] : [];
  });

  return [
    { icon: "@", label: CONTACT_EMAIL, url: `mailto:${CONTACT_EMAIL}` },
    // LinkedIn first, then GitHub, as in a printed resume.
    ...profiles.sort((a, b) => b.icon.localeCompare(a.icon)),
    { icon: "www", label: shortUrl(SITE_URL), url: `${SITE_URL}/${locale}` },
  ];
}

/** pdfkit writes one `/Type /Page` object per page (`/Type /Pages` is the page tree). */
function countPages(pdf: Buffer) {
  return pdf.toString("latin1").match(PAGE_OBJECT)?.length ?? 0;
}

const DOCUMENTS = {
  modern: ModernResumeDocument,
  simple: SimpleResumeDocument,
} satisfies Record<ResumeStyle, unknown>;

/** Renders the fullest resume that fits on one page (see `FITS`). */
async function renderResume(
  style: ResumeStyle,
  props: Omit<ResumeDocumentProps, "fit">
) {
  const ResumeDocument = DOCUMENTS[style];
  let pdf: Buffer = Buffer.alloc(0);

  for (const fit of FITS) {
    // Each step only runs when the previous one did not fit, so they cannot run in parallel.
    // biome-ignore lint/performance/noAwaitInLoops: sequential by design
    pdf = await renderToBuffer(<ResumeDocument {...props} fit={fit} />);

    if (countPages(pdf) <= MAX_PAGES) {
      break;
    }
  }

  return pdf;
}

/**
 * Resume PDF generated from the same Hygraph data as the home page.
 * `?style=simple` gives the plain one-column CV; the default is the modern one with photo.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  const styleParam = request.nextUrl.searchParams.get("style");
  const style = isResumeStyle(styleParam) ? styleParam : "modern";

  if (!hasLocale(routing.locales, locale)) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  const [{ page }, t] = await Promise.all([
    getHomePageDataForRequest(locale),
    getTranslations({ locale, namespace: "Resume" }),
  ]);
  const photo = await getPhoto(page.profilePicture?.url);
  const today = format(new Date(), "dd/MM/yyyy", {
    locale: getDateLocale(locale),
  });

  const content = getResumeContent(locale);
  const pdf = await renderResume(style, {
    ageAndPlace: `${getAgeLabel(locale, content.birthDate)} | ${content.location}`,
    contacts: getContacts(page.socials, locale),
    content,
    copy: {
      aboutMe: t("aboutMe"),
      certifications: t("certifications"),
      contact: t("contact"),
      education: t("education"),
      experience: t("experience"),
      generatedFrom: t("generatedFrom", {
        date: today,
        site: shortUrl(SITE_URL),
      }),
      objective: t("objective"),
      projects: t("projects"),
      skills: t("skills"),
      summary: t("summary"),
    },
    courses: COURSES,
    info: page,
    locale,
    photo,
    siteUrl: SITE_URL,
  });

  return new NextResponse(new Uint8Array(pdf), {
    headers: {
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=86400",
      // `?preview=1` shows the PDF in the page (resume viewer); otherwise it downloads.
      "Content-Disposition": `${
        request.nextUrl.searchParams.get("preview") === "1"
          ? "inline"
          : "attachment"
      }; filename="${t(style === "simple" ? "fileNameSimple" : "fileName")}"`,
      "Content-Type": "application/pdf",
    },
  });
}
