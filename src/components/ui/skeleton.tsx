import type { ComponentProps } from "react";
import { cn } from "./cn";

export function Skeleton({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      aria-hidden
      {...props}
      className={cn("bg-muted/70 animate-pulse rounded-xl", className)}
    />
  );
}
