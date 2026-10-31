"use client";

import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useId, useRef, useState } from "react";

import { Button } from "@/components/ui";
import type { KnownTech as IKnownTech } from "@/types/projects";

import { SectionTitle } from "../SectionTitle";
import { KnowTech } from "./KnowTech";

/** Three rows of three on desktop; "show more" reveals the next batch. */
export const KNOWN_TECHS_STEP = 9;

interface KnowTechsProps {
  copy: {
    showLess: string;
    showMore: string;
  };
  locale: string;
  skillTime: string;
  skillTimeRemove: string;
  subtitleKnow: string;
  techs: IKnownTech[];
  titleKnow: string;
}

export function KnowTechs({
  copy,
  titleKnow,
  subtitleKnow,
  techs,
  locale,
  skillTime,
  skillTimeRemove,
}: KnowTechsProps) {
  const [visibleCount, setVisibleCount] = useState(KNOWN_TECHS_STEP);
  const sectionRef = useRef<HTMLElement>(null);
  const gridId = useId();
  const hasMore = visibleCount < techs.length;
  const canCollapse = techs.length > KNOWN_TECHS_STEP;

  function handleToggle() {
    if (hasMore) {
      setVisibleCount((count) => count + KNOWN_TECHS_STEP);
      return;
    }

    setVisibleCount(KNOWN_TECHS_STEP);
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section className="scroll-mt-24 py-16 sm:py-20" ref={sectionRef}>
      <div className="container space-y-10">
        <SectionTitle subtitle={subtitleKnow} title={titleKnow} />

        {/* Hidden items stay in the HTML so the full list is still indexed. */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" id={gridId}>
          {techs.map((tech, index) => (
            <motion.div
              hidden={index >= visibleCount}
              initial={{ opacity: 0, y: 20 }}
              key={tech.name}
              transition={{
                delay: (index % KNOWN_TECHS_STEP) * 0.05,
                duration: 0.3,
              }}
              viewport={{ amount: 0.35, once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <KnowTech
                locale={locale}
                skillTime={skillTime}
                skillTimeRemove={skillTimeRemove}
                tech={tech}
              />
            </motion.div>
          ))}
        </div>

        {canCollapse && (
          <div className="flex justify-center">
            <Button
              aria-controls={gridId}
              aria-expanded={!hasMore}
              onClick={handleToggle}
              size="sm"
              variant="outline"
            >
              {hasMore ? copy.showMore : copy.showLess}
              {hasMore ? <ChevronDown /> : <ChevronUp />}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
