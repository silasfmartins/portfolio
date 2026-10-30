import { Card, CardContent } from "@/components/ui";
import type { KnownTech as IKnownTech } from "@/types/projects";
import { getRelativeTimeString } from "@/utils/get-relative-time";
import { CMSIcon } from "../CMSIcon";

interface KnowTechProps {
  locale: string;
  skillTime: string;
  skillTimeRemove: string;
  tech: IKnownTech;
}

export function KnowTech({
  locale,
  tech,
  skillTime,
  skillTimeRemove,
}: KnowTechProps) {
  const normalizedLocale = locale === "pt-BR" ? "pt-BR" : locale;

  const relativeTime = getRelativeTimeString(
    new Date(tech.startDate),
    normalizedLocale
  )
    .replace(skillTimeRemove, "")
    .trim();

  return (
    <Card className="border-border/70 hover:border-primary/40 hover:shadow-glow h-full transition-all hover:-translate-y-1">
      <CardContent className="flex items-center justify-between gap-4 p-5">
        <div className="space-y-1.5">
          <p className="text-foreground font-medium">{tech.name}</p>
          <span className="text-muted-foreground text-sm">
            {relativeTime} {skillTime}
          </span>
        </div>

        <span className="text-primary">
          <CMSIcon icon={tech.iconSvg} />
        </span>
      </CardContent>
    </Card>
  );
}
