import type { About as IAbout } from "@/types/page-info";

import { SectionTitle } from "../SectionTitle";
import { AboutItem } from "./AboutItem";

interface AboutProps {
  about: IAbout[];
  locale: string;
  subtitleAbout: string;
  textAbout: string;
  titleAbout: string;
}

export function About({
  titleAbout,
  subtitleAbout,
  textAbout,
  locale,
  about,
}: AboutProps) {
  return (
    <section className="py-16 sm:py-20">
      <div className="container grid gap-10 lg:grid-cols-[340px_1fr] lg:gap-12">
        <div className="space-y-5">
          <SectionTitle subtitle={subtitleAbout} title={titleAbout} />
          <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
            {textAbout}
          </p>
        </div>

        <div className="space-y-4">
          {about?.map((education) => (
            <AboutItem
              about={education}
              key={`${education.companyName}-${education.role}`}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
