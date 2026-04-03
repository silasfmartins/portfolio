import type { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { getTranslations } from "next-intl/server";
import { Activity, cache, Suspense, use } from "react";

import { About } from "@/components/About";
import { HighlighetdProjects } from "@/components/HighlighetdProjects";
import { HomeHero } from "@/components/HomeHero";
import { KnowTechs } from "@/components/KnowTechs";
import { HomePageSkeleton } from "@/components/Skeletons/HomePageSkeleton";
import { WorkExperience } from "@/components/WorkExperience";
import { fallbackHomePageData } from "@/lib/fallback-content";
import { toHygraphLocale } from "@/lib/hygraph-locale";
import type { HomePageData } from "@/types/page-info";
import { fetchHygraphQuery } from "@/utils/fetch-hygraph-query";

export const metadata: Metadata = {
  description: "Home do site que contém os projetos React.js de Silas Martins.",
};

const getPageData = unstable_cache(
  async (locale: string): Promise<HomePageData> => {
    const hygraphLocale = toHygraphLocale(locale);

    const query = `
      query PageInfoQuery {
        page(where: {slug: "home"}, locales: ${hygraphLocale}) {
          introduction {
            raw
          }
          technologies {
            name
          }
          profilePicture {
            url
          }
          socials {
            url
            iconSvg
          }
          knownTechs {
            iconSvg
            name
            startDate
          }
          highlightProjects {
            slug
            thumbnail {
              url
            }
            title
            shortDescription
            technologies {
              name
            }
          }
          about {
            companyLogo {
              url
            }
            role
            companyName
            companyUrl
            startDate
            endDate
          }
          workExperiences {
            companyLogo {
              url
            }
            role
            companyName
            companyUrl
            startDate
            endDate
            description {
              raw
            }
          }
        }
      }
    `;
    try {
      return await fetchHygraphQuery(query, hygraphLocale, 60 * 60 * 24);
    } catch (error) {
      const reason = error instanceof Error ? error.message : "Unknown error";
      console.warn(
        `[HomePage] Falling back to local content because Hygraph request failed: ${reason}`
      );
      return fallbackHomePageData;
    }
  },
  ["home-page-data"],
  {
    revalidate: 60 * 60 * 24,
    tags: ["home-page-data"],
  }
);

const getHomePageDataForRequest = cache(async (locale: string) =>
  getPageData(locale)
);
const getHomeTranslationsForRequest = cache(async (_locale: string) =>
  getTranslations("Index")
);

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default function Home({ params }: HomePageProps) {
  const { locale } = use(params);

  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <HomeContent locale={locale} />
    </Suspense>
  );
}

interface HomeContentProps {
  locale: string;
}

async function HomeContent({ locale }: HomeContentProps) {
  const [t, { page: pageData }] = await Promise.all([
    getHomeTranslationsForRequest(locale),
    getHomePageDataForRequest(locale),
  ]);

  return (
    <>
      <Activity>
        <HomeHero button1={t("button1")} homeInfo={pageData} role={t("role")} />
      </Activity>

      <Activity>
        <KnowTechs
          locale={locale}
          skillTime={t("skillTime")}
          skillTimeRemove={t("skillTimeRemove")}
          subtitleKnow={t("subtitleKnow")}
          techs={pageData.knownTechs}
          titleKnow={t("titleKnow")}
        />
      </Activity>

      <Activity>
        <HighlighetdProjects
          projects={pageData.highlightProjects}
          subtitleEmphasis={t("subtitleEmphasis")}
          text1Emphasis={t("text1Emphasis")}
          text2Emphasis={t("text2Emphasis")}
          titleEmphasis={t("titleEmphasis")}
          viewProjects={t("viewProjects")}
        />
      </Activity>

      <Activity>
        <WorkExperience
          experiences={pageData.workExperiences}
          locale={locale}
          subtitleExperience={t("subtitleExperience")}
          textExperience={t("textExperience")}
          titleExperience={t("titleExperience")}
        />
      </Activity>

      <Activity>
        <About
          about={pageData.about}
          locale={locale}
          subtitleAbout={t("subtitleAbout")}
          textAbout={t("textAbout")}
          titleAbout={t("titleAbout")}
        />
      </Activity>
    </>
  );
}
