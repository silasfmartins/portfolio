import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { About } from "@/components/About";
import { HighlighetdProjects } from "@/components/HighlighetdProjects";
import { HomeHero } from "@/components/HomeHero";
import { KnowTechs } from "@/components/KnowTechs";
import { WorkExperience } from "@/components/WorkExperience";
import { fallbackHomePageData } from "@/lib/fallback-content";
import { toHygraphLocale } from "@/lib/hygraph-locale";
import type { HomePageData } from "@/types/page-info";
import { fetchHygraphQuery } from "@/utils/fetch-hygraph-query";

export const metadata: Metadata = {
  description: "Home do site que contém os projetos React.js de Silas Martins.",
};

async function getPageData(locale: string): Promise<HomePageData> {
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
}

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: HomePageProps) {
  const { locale } = await params;

  const [t, { page: pageData }] = await Promise.all([
    getTranslations("Index"),
    getPageData(locale),
  ]);

  return (
    <>
      <HomeHero button1={t("button1")} homeInfo={pageData} role={t("role")} />

      <KnowTechs
        locale={locale}
        skillTime={t("skillTime")}
        skillTimeRemove={t("skillTimeRemove")}
        subtitleKnow={t("subtitleKnow")}
        techs={pageData.knownTechs}
        titleKnow={t("titleKnow")}
      />

      <HighlighetdProjects
        projects={pageData.highlightProjects}
        subtitleEmphasis={t("subtitleEmphasis")}
        text1Emphasis={t("text1Emphasis")}
        text2Emphasis={t("text2Emphasis")}
        titleEmphasis={t("titleEmphasis")}
        viewProjects={t("viewProjects")}
      />

      <WorkExperience
        experiences={pageData.workExperiences}
        locale={locale}
        subtitleExperience={t("subtitleExperience")}
        textExperience={t("textExperience")}
        titleExperience={t("titleExperience")}
      />

      <About
        about={pageData.about}
        locale={locale}
        subtitleAbout={t("subtitleAbout")}
        textAbout={t("textAbout")}
        titleAbout={t("titleAbout")}
      />
    </>
  );
}
