import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

export const badgeVariants = tv({
  base: "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium tracking-wide",
  defaultVariants: { variant: "default" },
  variants: {
    variant: {
      default: "bg-primary/15 text-primary border-transparent",
      outline: "border-border/80 text-muted-foreground",
      secondary: "bg-secondary text-secondary-foreground border-transparent",
      tech: "border-primary/20 bg-primary/10 text-primary tracking-normal",
    },
  },
});

export type BadgeProps = ComponentProps<"span"> &
  VariantProps<typeof badgeVariants>;

export function Badge({ variant, className, ...props }: BadgeProps) {
  return <span {...props} className={badgeVariants({ className, variant })} />;
}
