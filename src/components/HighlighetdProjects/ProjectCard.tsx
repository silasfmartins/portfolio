"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { fadeUpAnimation, techBadgeAnimation } from "@/lib/animations";
import type { Project } from "@/types/projects";
import { NextLink } from "../Link";
import { TechBadge } from "../TechBadge";

interface ProjectCardProps {
  project: Project;
  viewProjects: string;
}

export function ProjectCard({ project, viewProjects }: ProjectCardProps) {
  const thumbnailUrl = project.thumbnail?.url ?? "/images/hero-bg.png";

  return (
    <motion.article
      className="grid gap-6 lg:grid-cols-[360px_1fr] lg:items-start"
      initial={{ opacity: 0, y: 25 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true, amount: 0.25 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <motion.div
        className="overflow-hidden rounded-2xl border border-border/70"
        {...fadeUpAnimation}
        transition={{ duration: 0.35, delay: 0.05 }}
      >
        <Image
          alt={`Thumbnail do projeto ${project.title}`}
          className="h-[220px] w-full object-cover transition-transform duration-500 hover:scale-[1.03] sm:h-[280px]"
          height={304}
          src={thumbnailUrl}
          width={420}
        />
      </motion.div>

      <div className="space-y-5">
        <motion.h3
          className="font-display font-semibold text-2xl text-foreground"
          {...fadeUpAnimation}
          transition={{ duration: 0.4, delay: 0.12 }}
        >
          {project.title}
        </motion.h3>

        <motion.p
          className="text-muted-foreground text-sm leading-relaxed sm:text-base"
          {...fadeUpAnimation}
          transition={{ duration: 0.35, delay: 0.17 }}
        >
          {project.shortDescription}
        </motion.p>

        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <TechBadge
              key={`${project.title}-tech-${tech.name}`}
              name={tech.name}
              {...techBadgeAnimation}
              transition={{ duration: 0.22, delay: 0.2 + index * 0.04 }}
            />
          ))}
        </div>

        <NextLink className="font-semibold" href={`/projects/${project.slug}`}>
          {viewProjects}
          <ArrowRight className="h-4 w-4" />
        </NextLink>
      </div>
    </motion.article>
  );
}
