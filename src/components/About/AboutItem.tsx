"use client";

import { differenceInMonths, differenceInYears, format } from "date-fns";
import { enUS, ptBR } from "date-fns/locale";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import type { About } from "@/types/page-info";

interface AboutItemProps {
  about: About;
  locale: string;
}

function getDuration(locale: string, startDate: Date, endDate: Date): string {
  const months = differenceInMonths(endDate, startDate);
  const years = differenceInYears(endDate, startDate);
  const monthsRemaining = months % 12;

  if (locale === "pt-BR") {
    if (years > 0) {
      return monthsRemaining > 0
        ? `${years} ${years > 1 ? "anos" : "ano"} e ${monthsRemaining} ${monthsRemaining > 1 ? "meses" : "mes"}`
        : `${years} ${years > 1 ? "anos" : "ano"}`;
    }

    return `${months} ${months > 1 ? "meses" : "mes"}`;
  }

  if (years > 0) {
    return monthsRemaining > 0
      ? `${years} ${years > 1 ? "years" : "year"} and ${monthsRemaining} ${monthsRemaining > 1 ? "months" : "month"}`
      : `${years} ${years > 1 ? "years" : "year"}`;
  }

  return `${months} ${months > 1 ? "months" : "month"}`;
}

export function AboutItem({ locale, about }: AboutItemProps) {
  const localeForDate = locale === "pt-BR" ? ptBR : enUS;

  const startDate = new Date(about.startDate);
  const endDate = about.endDate ? new Date(about.endDate) : new Date();

  const formattedStartDate = format(startDate, "MMM yyyy", {
    locale: localeForDate,
  });

  const formattedEndDate = about.endDate
    ? format(endDate, "MMM yyyy", { locale: localeForDate })
    : locale === "pt-BR"
      ? "o momento"
      : "present";

  const formattedDuration = getDuration(locale, startDate, endDate);

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
              alt={`Logo da instituição ${about.companyName}`}
              className="h-10 w-10 rounded-full border border-border/70 object-cover"
              height={40}
              src={about.companyLogo.url}
              width={40}
            />

            <div className="min-w-0 flex-1 space-y-2">
              <a
                className="inline-flex font-medium text-primary text-sm transition-colors hover:text-primary/80"
                href={about.companyUrl}
                rel="noreferrer"
                target="_blank"
              >
                @{about.companyName}
              </a>

              <h4 className="font-display font-semibold text-foreground text-lg">
                {about.role}
              </h4>

              <span className="block text-muted-foreground text-xs uppercase tracking-[0.08em]">
                {formattedStartDate} • {formattedEndDate} • {formattedDuration}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
