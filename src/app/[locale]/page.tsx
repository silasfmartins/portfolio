import { getTranslations } from "next-intl/server";
import { Activity, cache, Suspense, use } from "react";

import { About } from "@/components/About";
import { HighlightedProjects } from "@/components/HighlightedProjects";
import { HomeHero } from "@/components/HomeHero";
import { KnowTechs } from "@/components/KnowTechs";
import { HomePageSkeleton } from "@/components/Skeletons/HomePageSkeleton";
import { WorkExperience } from "@/components/WorkExperience";
import { getHomePageDataForRequest } from "@/lib/home-data";
import { getResumeDownloadOptions } from "@/lib/resume/downloads";

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
        <HomeHero
          button1={t("button1")}
          homeInfo={pageData}
          resume={{
            label: t("downloadResume"),
            options: getResumeDownloadOptions((language) =>
              t("downloadResumeIn", { language })
            ),
            preview: { href: "/resume", label: t("viewResume") },
          }}
          role={t("role")}
        />
      </Activity>

      <Activity>
        <KnowTechs
          copy={{ showLess: t("showLessKnow"), showMore: t("showMoreKnow") }}
          locale={locale}
          skillTime={t("skillTime")}
          skillTimeRemove={t("skillTimeRemove")}
          subtitleKnow={t("subtitleKnow")}
          techs={pageData.knownTechs}
          titleKnow={t("titleKnow")}
        />
      </Activity>

      <Activity>
        <HighlightedProjects
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
