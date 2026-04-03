function SkeletonBlock({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`animate-pulse rounded-xl bg-muted/70 ${className ?? ""}`}
    />
  );
}

export default function Loading() {
  return (
    <section className="py-12 sm:py-16">
      <div className="container space-y-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-4">
            <SkeletonBlock className="h-6 w-28 rounded-full" />
            <SkeletonBlock className="h-12 w-72" />
            <SkeletonBlock className="h-5 w-64" />
            <SkeletonBlock className="h-28 w-full" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonBlock className="h-7 w-20 rounded-full" key={index} />
              ))}
            </div>
          </div>
          <SkeletonBlock className="mx-auto h-[320px] w-full max-w-[420px] rounded-[1.7rem]" />
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonBlock className="h-24" key={index} />
          ))}
        </div>

        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <SkeletonBlock className="h-[220px]" key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
