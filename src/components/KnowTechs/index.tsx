"use client";

import { motion } from "framer-motion";

import type { KnownTech as IKnownTech } from "@/types/projects";

import { SectionTitle } from "../SectionTitle";
import { KnowTech } from "./KnowTech";

interface KnowTechsProps {
  locale: string;
  skillTime: string;
  skillTimeRemove: string;
  subtitleKnow: string;
  techs: IKnownTech[];
  titleKnow: string;
}

export function KnowTechs({
  titleKnow,
  subtitleKnow,
  techs,
  locale,
  skillTime,
  skillTimeRemove,
}: KnowTechsProps) {
  return (
    <section className="py-16 sm:py-20">
      <div className="container space-y-10">
        <SectionTitle subtitle={subtitleKnow} title={titleKnow} />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {techs?.map((tech, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              key={tech.name}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true, amount: 0.35 }}
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
      </div>
    </section>
  );
}
