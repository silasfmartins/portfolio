import type { WorkExperience as IWorkExperience } from "@/types/page-info";

import { SectionTitle } from "../SectionTitle";
import { ExperienceItem } from "./ExperienceItem";

interface WorkExperienceProps {
  experiences: IWorkExperience[];
  locale: string;
  subtitleExperience: string;
  textExperience: string;
  titleExperience: string;
}

export function WorkExperience({
  locale,
  experiences,
  titleExperience,
  subtitleExperience,
  textExperience,
}: WorkExperienceProps) {
  return (
    <section className="py-16 sm:py-20">
      <div className="container grid gap-10 lg:grid-cols-[340px_1fr] lg:gap-12">
        <div className="space-y-5">
          <SectionTitle subtitle={subtitleExperience} title={titleExperience} />
          <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
            {textExperience}
          </p>
        </div>

        <div className="space-y-4">
          {experiences?.map((experience) => (
            <ExperienceItem
              experience={experience}
              key={`${experience.companyName}-${experience.role}`}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
