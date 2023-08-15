import { Metadata } from 'next'

import { fetchHygraphQuery } from '@/utils/fetch-hygraph-query'
import { HomePageData } from '@/types/page-info'

import { HomeHero } from '@/components/HomeHero'
import { KnowTechs } from '@/components/KnowTechs'
import { HighlighetdProjects } from '@/components/HighlighetdProjects'
import { About } from '@/components/About'
import { WorkExperience } from '@/components/WorkExperience'

export const metadata: Metadata = {
  description:
    'Home do site que contém todos os projetos React.js de Silas Martins',
}

async function getPageData(): Promise<HomePageData> {
  const query = `
  query PageInfoQuery {
    page(where: {slug: "home"}) {
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

  return fetchHygraphQuery(query, 60 * 60 * 24)
}

export default async function Home() {
  const { page: pageData } = await getPageData()

  return (
    <>
      <HomeHero homeInfo={pageData} />
      <KnowTechs techs={pageData.knownTechs} />
      <HighlighetdProjects projects={pageData.highlightProjects} />
      <WorkExperience experiences={pageData.workExperiences} />
      <About about={pageData.about} />
    </>
  )
}
