"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { fadeUpAnimation } from "@/lib/animations";
import type { ProjectSection } from "@/types/projects";

interface ProjectSectionsProps {
  sections: ProjectSection[];
}

export function ProjectSections({ sections }: ProjectSectionsProps) {
  return (
    <section className="pb-20 sm:pb-24">
      <div className="container space-y-14 sm:space-y-20">
        {sections.map((section) => (
          <motion.article
            className="space-y-5"
            key={section.title}
            {...fadeUpAnimation}
            transition={{ duration: 0.35 }}
            viewport={{ amount: 0.22, once: true }}
          >
            <h2 className="font-display text-foreground text-2xl font-semibold sm:text-3xl">
              {section.title}
            </h2>

            <div className="border-border/70 overflow-hidden rounded-2xl border">
              <Image
                alt={`Imagem da seção ${section.title}`}
                className="w-full object-cover"
                height={700}
                sizes="(min-width: 1280px) 1200px, 100vw"
                src={section.image?.url ?? "/images/hero-bg.png"}
                width={1200}
              />
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
