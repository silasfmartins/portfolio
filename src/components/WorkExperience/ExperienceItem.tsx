"use client";

import { format } from "date-fns";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui";
import {
  getDateLocale,
  getDurationLabel,
  getPresentLabel,
} from "@/lib/date-labels";
import type { WorkExperience } from "@/types/page-info";
import { RichText } from "../RichText";

interface ExperienceItemProps {
  experience: WorkExperience;
  locale: string;
}

export function ExperienceItem({ locale, experience }: ExperienceItemProps) {
  const localeForDate = getDateLocale(locale);

  const startDate = new Date(experience.startDate);
  const end = experience.endDate ? new Date(experience.endDate) : new Date();

  const formattedStartDate = format(startDate, "MMM yyyy", {
    locale: localeForDate,
  });
  const formattedEndDate = experience.endDate
    ? format(end, "MMM yyyy", { locale: localeForDate })
    : getPresentLabel(locale);

  const formattedDuration = getDurationLabel(locale, startDate, end);
  const description = experience.description?.raw;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      viewport={{ amount: 0.25, once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <Card className="border-border/70">
        <CardContent className="p-5 sm:p-6">
          <div className="flex items-start gap-4">
            {experience.companyLogo && (
              <Image
                alt={`Logo da empresa ${experience.companyName}`}
                className="border-border/70 h-10 w-10 rounded-full border object-cover"
                height={40}
                src={experience.companyLogo.url}
                width={40}
              />
            )}

            <div className="min-w-0 flex-1 space-y-2">
              <a
                className="text-primary hover:text-primary/80 inline-flex text-sm font-medium transition-colors"
                href={experience.companyUrl}
                rel="noreferrer"
                target="_blank"
              >
                @{experience.companyName}
              </a>

              <h4 className="font-display text-foreground text-lg font-semibold">
                {experience.role}
              </h4>

              <span className="text-muted-foreground block text-xs tracking-[0.08em] uppercase">
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
