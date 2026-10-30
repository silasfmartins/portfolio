import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

export const separatorVariants = tv({
  base: "bg-border/80 shrink-0",
  defaultVariants: { orientation: "horizontal" },
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "h-full w-px",
    },
  },
});

export type SeparatorProps = Omit<ComponentProps<"div">, "role"> &
  VariantProps<typeof separatorVariants>;

export function Separator({
  orientation = "horizontal",
  className,
  ...props
}: SeparatorProps) {
  return (
    <div
      {...props}
      aria-orientation={orientation}
      className={separatorVariants({ className, orientation })}
      role="separator"
    />
  );
}
