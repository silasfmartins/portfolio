"use client";

import { motion } from "framer-motion";
import { fadeUpAnimation } from "@/lib/animations";
import { Link } from "@/navigation";
import type { Project } from "@/types/projects";

import { ProjectCard } from "./ProjectCard";

interface ProjectsListProps {
  projects: Project[];
}

export function ProjectsList({ projects }: ProjectsListProps) {
  return (
    <section className="pb-20 sm:pb-24">
      <div className="container grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <motion.div
            key={project.slug}
            {...fadeUpAnimation}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <Link href={`/projects/${project.slug}`}>
              <ProjectCard project={project} />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
