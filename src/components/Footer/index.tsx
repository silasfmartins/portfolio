import { BriefcaseBusiness, Code2, Mail } from "lucide-react";
import { Link } from "@/navigation";

const ICONS = [
  {
    icon: <Code2 className="h-4 w-4" />,
    label: "GitHub",
    url: "https://github.com/silasfmartins",
  },
  {
    icon: <BriefcaseBusiness className="h-4 w-4" />,
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/silas-martins/",
  },
  {
    icon: <Mail className="h-4 w-4" />,
    label: "Email",
    url: "mailto:silas.martins2041@gmail.com",
  },
];

interface FooterProps {
  madeBy: string;
  privacy: string;
  rightsReserved: string;
}

export function Footer({ madeBy, privacy, rightsReserved }: FooterProps) {
  return (
    <footer className="border-border/70 bg-card/50 border-t py-8">
      <div className="container flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-muted-foreground space-y-1 text-sm">
          <p>
            {madeBy}{" "}
            <strong className="text-foreground font-semibold">
              Silas Martins
            </strong>
          </p>
          <p>{rightsReserved}</p>
          <Link className="text-primary underline" href="/privacy">
            {privacy}
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {ICONS.map((icon) => (
            <a
              aria-label={icon.label}
              className="border-border/70 bg-card text-muted-foreground hover:border-primary/50 hover:text-primary inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors"
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
