"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { NextLink } from "../Link";
import { SectionTitle } from "../SectionTitle";

interface ProjectsIntroductionProps {
  backToHome: string;
  subtitleProjects: string;
  textProjects: string;
  titleProjects: string;
}

export function ProjectsIntroduction({
  titleProjects,
  subtitleProjects,
  textProjects,
  backToHome,
}: ProjectsIntroductionProps) {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="container">
        <div className="glass-panel rounded-3xl p-8 sm:p-10 lg:p-14">
          <SectionTitle
            className="items-center text-center"
            subtitle={subtitleProjects}
            title={titleProjects}
          />

          <motion.div
            className="mx-auto mt-7 max-w-3xl space-y-5 text-center"
            initial={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.35 }}
            viewport={{ once: true, amount: 0.45 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
              {textProjects}
            </p>

            <NextLink className="justify-center font-semibold" href="/">
              <ArrowLeft className="h-4 w-4" />
              {backToHome}
            </NextLink>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
