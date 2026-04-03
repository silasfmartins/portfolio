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
        <div className="rounded-3xl border border-border/70 bg-card/60 p-8">
          <SkeletonBlock className="mx-auto h-6 w-24" />
          <SkeletonBlock className="mx-auto mt-3 h-10 w-64" />
          <SkeletonBlock className="mx-auto mt-5 h-20 w-full max-w-2xl" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 9 }).map((_, index) => (
            <SkeletonBlock className="h-[360px]" key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
