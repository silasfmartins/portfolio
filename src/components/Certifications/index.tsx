import { Award, ExternalLink } from "lucide-react";

import { Card, CardContent } from "@/components/ui";
import type { Course } from "@/lib/resume/courses";
import { SectionTitle } from "../SectionTitle";

interface CertificationsProps {
  copy: {
    subtitle: string;
    text: string;
    title: string;
    /** Accessible name of the credential link; receives the course title. */
    viewCredential: (title: string) => string;
    viewCredentialShort: string;
  };
  courses: Course[];
}

/** Courses and certifications from `src/lib/resume/courses.ts`, the same list as the resume PDF. */
export function Certifications({ copy, courses }: CertificationsProps) {
  if (courses.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-20" id="certifications">
      <div className="container grid gap-10 lg:grid-cols-[340px_1fr] lg:gap-12">
        <div className="space-y-5">
          <SectionTitle subtitle={copy.subtitle} title={copy.title} />
          <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
            {copy.text}
          </p>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2">
          {courses.map((course) => (
            <li key={`${course.title}-${course.provider}`}>
              <Card className="border-border/70 h-full">
                <CardContent className="flex h-full items-start gap-3 p-4">
                  <span className="border-border/70 bg-background/60 text-primary flex size-9 shrink-0 items-center justify-center rounded-lg border">
                    <Award className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1 space-y-1">
                    <h3 className="text-foreground text-sm leading-snug font-semibold">
                      {course.title}
                    </h3>
                    <p className="text-muted-foreground text-xs">
                      {course.year
                        ? `${course.provider} • ${course.year}`
                        : course.provider}
                    </p>
                    {course.url && (
                      <a
                        aria-label={copy.viewCredential(course.title)}
                        className="text-primary hover:text-primary/80 inline-flex items-center gap-1 text-xs font-medium transition-colors"
                        href={course.url}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {copy.viewCredentialShort}
                        <ExternalLink className="size-3" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
