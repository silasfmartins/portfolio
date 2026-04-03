"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Code2, ExternalLink } from "lucide-react";
import { fadeUpAnimation, techBadgeAnimation } from "@/lib/animations";
import { Link } from "@/navigation";
import type { Project } from "@/types/projects";
import { Button } from "../Button";
import { RichText } from "../RichText";
import { TechBadge } from "../TechBadge";

interface ProjectDetailsProps {
  backProjects: string;
  project: Project;
  projectOnline: string;
  projectsRepository: string;
  projectsTitle: string;
}

export function ProjectDetails({
  projectsTitle,
  projectsRepository,
  projectOnline,
  backProjects,
  project,
}: ProjectDetailsProps) {
  const backgroundThumbnailUrl =
    project.pageThumbnail?.url ?? "/images/hero-bg.png";

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      <div
        className="pointer-events-none absolute inset-0 -z-20 bg-center bg-cover"
        style={{ backgroundImage: `url(${backgroundThumbnailUrl})` }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-slate-950/75 backdrop-blur-[1.5px]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.35),transparent_45%)]" />

      <div className="container">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/15 bg-black/30 p-8 backdrop-blur-xl sm:p-10">
          <motion.span
            className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 font-mono text-white/80 text-xs uppercase tracking-[0.14em]"
            initial={{ opacity: 0, x: -14 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true, amount: 0.6 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            {projectsTitle}
          </motion.span>

          <motion.h1
            className="mt-4 font-display font-semibold text-3xl text-white sm:text-4xl"
            initial={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.35, delay: 0.08 }}
            viewport={{ once: true, amount: 0.5 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            {project.title}
          </motion.h1>

          <motion.div
            className="mt-5 text-sm text-white/80 sm:text-base"
            {...fadeUpAnimation}
            transition={{ duration: 0.3, delay: 0.14 }}
            viewport={{ once: true, amount: 0.35 }}
          >
            <RichText content={project.description.raw} />
          </motion.div>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <TechBadge
                className="border-white/25 bg-white/10 text-white"
                key={tech.name}
                name={tech.name}
                {...techBadgeAnimation}
                transition={{ duration: 0.22, delay: index * 0.04 }}
              />
            ))}
          </div>

          <motion.div
            className="mt-8 flex flex-col items-start gap-3 sm:flex-row"
            {...fadeUpAnimation}
            transition={{ duration: 0.35, delay: 0.2 }}
            viewport={{ once: true, amount: 0.35 }}
          >
            {project.githubUrl && (
              <a href={project.githubUrl} rel="noreferrer" target="_blank">
                <Button className="bg-white text-slate-900 hover:bg-white/90">
                  <Code2 className="h-4 w-4" />
                  {projectsRepository}
                </Button>
              </a>
            )}

            {project.liveProjectUrl && (
              <a href={project.liveProjectUrl} rel="noreferrer" target="_blank">
                <Button
                  className="border-white/40 text-white hover:bg-white/15"
                  variant="outline"
                >
                  <ExternalLink className="h-4 w-4" />
                  {projectOnline}
                </Button>
              </a>
            )}
          </motion.div>

          <Link
            className="mt-8 inline-flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
            href="/projects"
          >
            <ArrowLeft className="h-4 w-4" />
            {backProjects}
          </Link>
        </div>
      </div>
    </section>
  );
}
