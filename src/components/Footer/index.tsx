import { BriefcaseBusiness, Code2, Mail } from "lucide-react";

const ICONS = [
  {
    icon: <Code2 className="h-4 w-4" />,
    url: "https://github.com/silasfmartins",
    label: "GitHub",
  },
  {
    icon: <BriefcaseBusiness className="h-4 w-4" />,
    url: "https://www.linkedin.com/in/silas-martins/",
    label: "LinkedIn",
  },
  {
    icon: <Mail className="h-4 w-4" />,
    url: "mailto:silas.martins2041@gmail.com",
    label: "Email",
  },
];

interface FooterProps {
  madeBy: string;
  rightsReserved: string;
}

export function Footer({ madeBy, rightsReserved }: FooterProps) {
  return (
    <footer className="border-border/70 border-t bg-card/50 py-8">
      <div className="container flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1 text-muted-foreground text-sm">
          <p>
            {madeBy}{" "}
            <strong className="font-semibold text-foreground">
              Silas Martins
            </strong>
          </p>
          <p>{rightsReserved}</p>
        </div>

        <div className="flex items-center gap-2">
          {ICONS.map((icon) => (
            <a
              aria-label={icon.label}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-card text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              href={icon.url}
              key={icon.label}
              rel="noreferrer"
              target="_blank"
            >
              {icon.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
