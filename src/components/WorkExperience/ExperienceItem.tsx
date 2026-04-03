"use client";

import { differenceInMonths, differenceInYears, format } from "date-fns";
import { enUS, ptBR } from "date-fns/locale";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import type { WorkExperience } from "@/types/page-info";
import { RichText } from "../RichText";

interface ExperienceItemProps {
  experience: WorkExperience;
  locale: string;
}

function getDurationLabel(
  locale: string,
  startDate: Date,
  endDate: Date
): string {
  const months = differenceInMonths(endDate, startDate);
  const years = differenceInYears(endDate, startDate);
  const monthsRemaining = months % 12;

  if (locale === "pt-BR") {
    if (years > 0) {
      const yearLabel = years > 1 ? "anos" : "ano";
      const monthLabel = monthsRemaining > 1 ? "meses" : "mes";

      return monthsRemaining > 0
        ? `${years} ${yearLabel} e ${monthsRemaining} ${monthLabel}`
        : `${years} ${yearLabel}`;
    }

    const monthLabel = months > 1 ? "meses" : "mes";
    return `${months} ${monthLabel}`;
  }

  if (years > 0) {
    const yearLabel = years > 1 ? "years" : "year";
    const monthLabel = monthsRemaining > 1 ? "months" : "month";

    return monthsRemaining > 0
      ? `${years} ${yearLabel} and ${monthsRemaining} ${monthLabel}`
      : `${years} ${yearLabel}`;
  }

  const monthLabel = months > 1 ? "months" : "month";
  return `${months} ${monthLabel}`;
}

export function ExperienceItem({ locale, experience }: ExperienceItemProps) {
  const localeForDate = locale === "pt-BR" ? ptBR : enUS;

  const startDate = new Date(experience.startDate);
  const end = experience.endDate ? new Date(experience.endDate) : new Date();

  const formattedStartDate = format(startDate, "MMM yyyy", {
    locale: localeForDate,
  });
  const formattedEndDate = experience.endDate
    ? format(end, "MMM yyyy", { locale: localeForDate })
    : locale === "pt-BR"
      ? "o momento"
      : "present";

  const formattedDuration = getDurationLabel(locale, startDate, end);
  const description = experience.description?.raw;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true, amount: 0.25 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <Card className="border-border/70">
        <CardContent className="p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <Image
              alt={`Logo da empresa ${experience.companyName}`}
              className="h-10 w-10 rounded-full border border-border/70 object-cover"
              height={40}
              src={experience.companyLogo.url}
              width={40}
            />

            <div className="min-w-0 flex-1 space-y-2">
              <a
                className="inline-flex font-medium text-primary text-sm transition-colors hover:text-primary/80"
                href={experience.companyUrl}
                rel="noreferrer"
                target="_blank"
              >
                @{experience.companyName}
              </a>

              <h4 className="font-display font-semibold text-foreground text-lg">
                {experience.role}
              </h4>

              <span className="block text-muted-foreground text-xs uppercase tracking-[0.08em]">
                {formattedStartDate} • {formattedEndDate} • {formattedDuration}
              </span>

              {description ? (
                <div className="pt-1 text-sm">
                  <RichText content={description} />
                </div>
              ) : null}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
