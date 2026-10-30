import Image from "next/image";
import { Card, CardContent } from "@/components/ui";
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
    <Card className="group border-border/70 hover:border-primary/45 hover:shadow-glow h-full overflow-hidden transition-all duration-300 hover:-translate-y-1">
      <div className="border-border/70 relative h-48 w-full overflow-hidden border-b">
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
        <h3 className="font-display text-foreground text-lg font-semibold">
          {project.title}
        </h3>

        <p className="text-muted-foreground line-clamp-4 text-sm leading-relaxed">
          {project.shortDescription}
        </p>

        <p className="text-primary/85 mt-auto line-clamp-2 text-xs tracking-[0.08em] uppercase">
          {technologies.join(" • ")}
        </p>
      </CardContent>
    </Card>
  );
}
