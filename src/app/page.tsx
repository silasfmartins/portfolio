import { HomeHero } from '@/components/HomeHero'
import { About } from '@/components/About'
import { KnowTechs } from '@/components/KnowTechs'
import { HighlighetdProjects } from '@/components/HighlighetdProjects'

import { fetchHygraphQuery } from '@/utils/fetch-hygraph-query'
import { HomePageData } from '@/types/page-info'

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
        academicEducation {
          name
          imageAlt
          institution
          date
          image {
            url
          }
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
      <About academicEducation={pageData.academicEducation} />
      <KnowTechs techs={pageData.knownTechs} />
      <HighlighetdProjects projects={pageData.highlightProjects} />
    </>
  )
}
