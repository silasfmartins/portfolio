import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "secondary" | "outline";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantClassNames: Record<BadgeVariant, string> = {
  default: "border-transparent bg-primary/15 text-primary",
  secondary: "border-transparent bg-secondary text-secondary-foreground",
  outline: "border-border/80 text-muted-foreground",
};

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 font-medium text-xs tracking-wide",
        variantClassNames[variant],
        className
      )}
      {...props}
    />
  );
}
