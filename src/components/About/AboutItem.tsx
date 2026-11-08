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
import type { About } from "@/types/page-info";

interface AboutItemProps {
  about: About;
  locale: string;
}

export function AboutItem({ locale, about }: AboutItemProps) {
  const localeForDate = getDateLocale(locale);

  const startDate = new Date(about.startDate);
  const endDate = about.endDate ? new Date(about.endDate) : new Date();

  const formattedStartDate = format(startDate, "MMM yyyy", {
    locale: localeForDate,
  });

  const formattedEndDate = about.endDate
    ? format(endDate, "MMM yyyy", { locale: localeForDate })
    : getPresentLabel(locale);

  const formattedDuration = getDurationLabel(locale, startDate, endDate);

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
            {about.companyLogo && (
              <Image
                alt={`Logo da instituição ${about.companyName}`}
                className="border-border/70 h-10 w-10 rounded-full border object-cover"
                height={40}
                src={about.companyLogo.url}
                width={40}
              />
            )}

            <div className="min-w-0 flex-1 space-y-2">
              <a
                className="text-primary hover:text-primary/80 inline-flex text-sm font-medium transition-colors"
                href={about.companyUrl}
                rel="noreferrer"
                target="_blank"
              >
                @{about.companyName}
              </a>

              <h4 className="font-display text-foreground text-lg font-semibold">
                {about.role}
              </h4>

              <span className="text-muted-foreground block text-xs tracking-[0.08em] uppercase">
                {formattedStartDate} • {formattedEndDate} • {formattedDuration}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
