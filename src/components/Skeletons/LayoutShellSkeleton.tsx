import { Skeleton } from "@/components/ui";
import en from "../../../messages/en.json";
import ptBR from "../../../messages/pt-BR.json";

// Rendered before the translations provider exists, so it reads the messages directly.
const LOADING_TEXT: Record<string, string> = {
  en: en.Status.loadingContent,
  "pt-BR": ptBR.Status.loadingContent,
};

export function LayoutShellSkeleton({ locale }: { locale: string }) {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="container py-6">
        <div className="border-border/60 flex items-center justify-between gap-4 border-b pb-5">
          <Skeleton className="h-11 w-48 rounded-full" />
          <Skeleton className="h-9 w-28 rounded-full" />
        </div>

        <div className="space-y-6 py-10">
          <Skeleton className="h-10 w-80" />
          <Skeleton className="h-5 w-full max-w-2xl" />
          <Skeleton className="h-5 w-full max-w-xl" />
          <Skeleton className="h-[320px] w-full rounded-3xl" />
        </div>

        <p className="text-muted-foreground text-center text-sm" role="status">
          {LOADING_TEXT[locale] ?? LOADING_TEXT["pt-BR"]}
        </p>
      </div>
    </div>
  );
}
