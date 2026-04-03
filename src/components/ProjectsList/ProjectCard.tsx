import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import type { Project } from "@/types/projects";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const technologies = project.technologies.map(
    (technology) => technology.name
  );
  const thumbnailUrl = project.thumbnail?.url ?? "/images/hero-bg.png";

  return (
    <Card className="group h-full overflow-hidden border-border/70 transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-glow">
      <div className="relative h-48 w-full overflow-hidden border-border/70 border-b">
        <Image
          alt={`Thumbnail do projeto ${project.title}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          height={240}
          src={thumbnailUrl}
          unoptimized
          width={420}
        />
      </div>

      <CardContent className="flex h-[220px] flex-col gap-3 p-5">
        <h3 className="font-display font-semibold text-foreground text-lg">
          {project.title}
        </h3>

        <p className="line-clamp-4 text-muted-foreground text-sm leading-relaxed">
          {project.shortDescription}
        </p>

        <p className="mt-auto line-clamp-2 text-primary/85 text-xs uppercase tracking-[0.08em]">
          {technologies.join(" • ")}
        </p>
      </CardContent>
    </Card>
  );
}
