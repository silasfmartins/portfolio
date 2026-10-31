import { Suspense, use } from "react";

import { ProjectsPageSkeleton } from "@/components/Skeletons/ProjectsPageSkeleton";
import { ProjectsContent } from "./projects-content";

export const metadata = {
  description: "Página que apresenta os projetos React.js de Silas Martins.",
  title: "Projetos",
};

interface ProjectsPageProps {
  params: Promise<{ locale: string }>;
}

export default function Projects({ params }: ProjectsPageProps) {
  const { locale } = use(params);

  return (
    <Suspense fallback={<ProjectsPageSkeleton />}>
      <ProjectsContent locale={locale} page={1} />
    </Suspense>
  );
}
