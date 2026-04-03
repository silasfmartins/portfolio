import { Skeleton } from "@/components/ui/skeleton";

export function ProjectDetailsSkeleton() {
  return (
    <section className="py-12 sm:py-16">
      <div className="container space-y-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-4">
            <Skeleton className="h-6 w-40 rounded-full" />
            <Skeleton className="h-12 w-full max-w-xl" />
            <Skeleton className="h-5 w-full max-w-2xl" />
            <Skeleton className="h-5 w-full max-w-2xl" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton className="h-7 w-20 rounded-full" key={index} />
              ))}
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <Skeleton className="h-10 w-40 rounded-full" />
              <Skeleton className="h-10 w-48 rounded-full" />
            </div>
          </div>

          <Skeleton className="h-[300px] w-full rounded-3xl sm:h-[360px]" />
        </div>

        <div className="space-y-5">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton className="h-[280px] w-full rounded-3xl" key={index} />
          ))}
        </div>

        <p className="text-center text-muted-foreground text-sm" role="status">
          Carregando detalhes do projeto...
        </p>
      </div>
    </section>
  );
}
