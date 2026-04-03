import { Skeleton } from "@/components/ui/skeleton";

export function LayoutShellSkeleton() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container py-6">
        <div className="flex items-center justify-between gap-4 border-border/60 border-b pb-5">
          <Skeleton className="h-11 w-48 rounded-full" />
          <Skeleton className="h-9 w-28 rounded-full" />
        </div>

        <div className="space-y-6 py-10">
          <Skeleton className="h-10 w-80" />
          <Skeleton className="h-5 w-full max-w-2xl" />
          <Skeleton className="h-5 w-full max-w-xl" />
          <Skeleton className="h-[320px] w-full rounded-3xl" />
        </div>

        <p className="text-center text-muted-foreground text-sm" role="status">
          Carregando conteudo...
        </p>
      </div>
    </div>
  );
}
