"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

import { Skeleton } from "@/components/ui";
import type { Project } from "@/types/projects";

// Runs only in the browser: reading the URL during prerender would make the projects pages dynamic.
const SearchPanel = dynamic(
  () => import("./SearchPanel").then((module) => module.SearchPanel),
  {
    loading: () => (
      <div className="container pb-8">
        <Skeleton className="h-[100px] sm:h-11 md:h-[72px]" />
      </div>
    ),
    ssr: false,
  }
);

interface ProjectsSearchProps {
  /** Prerendered list, hidden through CSS while a search is active. */
  children: ReactNode;
  projects: Project[];
}

export function ProjectsSearch({ children, projects }: ProjectsSearchProps) {
  return (
    <div className="group/projects">
      <SearchPanel projects={projects} />
      <div className="group-has-[[data-search-active]]/projects:hidden">
        {children}
      </div>
    </div>
  );
}
