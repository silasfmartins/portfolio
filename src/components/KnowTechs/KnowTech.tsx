import { Card, CardContent } from "@/components/ui/card";
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
    <Card className="h-full border-border/70 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow">
      <CardContent className="flex items-center justify-between gap-4 p-5">
        <div className="space-y-1.5">
          <p className="font-medium text-foreground">{tech.name}</p>
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
