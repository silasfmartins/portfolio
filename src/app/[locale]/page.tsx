import { Metadata } from 'next'

import { fetchHygraphQuery } from '@/utils/fetch-hygraph-query'
import { HomePageData } from '@/types/page-info'

import { HomeHero } from '@/components/HomeHero'
import { KnowTechs } from '@/components/KnowTechs'
import { HighlighetdProjects } from '@/components/HighlighetdProjects'
import { About } from '@/components/About'
import { WorkExperience } from '@/components/WorkExperience'
import { getTranslations } from 'next-intl/server'

export const metadata: Metadata = {
  description:
    'Home do site que contém todos os projetos React.js de Silas Martins',
}

async function getPageData(locale: string): Promise<HomePageData> {
  const query = `
query PageInfoQuery {
    page(where: {slug: "home"}, locales: ${locale}) {
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
`
  return fetchHygraphQuery(query, locale, 60 * 60 * 24)
}

interface Params {
  locale: string
}

export default async function Home({ params }: { params: Params }) {
  const t = await getTranslations("Index")
  const { locale } = params

  const { page: pageData } = await getPageData(locale)

  return (
    <>
      <HomeHero homeInfo={pageData} role={t("role")} button1={t("button1")} />
      <KnowTechs locale={locale} skillTime={t("skillTime")} titleKnow={t("titleKnow")} subtitleKnow={t("subtitleKnow")} techs={pageData.knownTechs} skillTimeRemove={t("skillTimeRemove")} />
      <HighlighetdProjects titleEmphasis={t("titleEmphasis")} subtitleEmphasis={t("subtitleEmphasis")} text1Emphasis={t("text1Emphasis")} text2Emphasis={t("text2Emphasis")} viewProjects={t("viewProjects")} projects={pageData.highlightProjects} />
      <WorkExperience titleExperience={t("titleExperience")} subtitleExperience={t("subtitleExperience")} textExperience={t("textExperience")} locale={locale} experiences={pageData.workExperiences} />
      <About titleAbout={t("titleAbout")} subtitleAbout={t("subtitleAbout")} textAbout={t("textAbout")} locale={locale} about={pageData.about} />
    </>
  )
}
