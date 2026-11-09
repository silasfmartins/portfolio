"use client";

import { useTranslations } from "next-intl";
import { Skeleton } from "@/components/ui";

export function ProjectsPageSkeleton() {
  const t = useTranslations("Status");

  return (
    <section className="py-12 sm:py-16">
      <div className="container space-y-8">
        <div className="border-border/70 bg-card/60 rounded-3xl border p-8">
          <Skeleton className="mx-auto h-6 w-24" />
          <Skeleton className="mx-auto mt-3 h-10 w-64" />
          <Skeleton className="mx-auto mt-5 h-20 w-full max-w-2xl" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 9 }).map((_, index) => (
            <Skeleton className="h-[360px]" key={index} />
          ))}
        </div>

        <p className="text-muted-foreground text-center text-sm" role="status">
          {t("loadingProjects")}
        </p>
      </div>
    </section>
  );
}
