import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

/** Exported so links can look like buttons (`buttonVariants({ variant: "outline" })`). */
export const buttonVariants = tv({
  base: "focus-visible:ring-ring inline-flex items-center justify-center gap-2 rounded-lg font-medium whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-4",
  defaultVariants: { size: "default", variant: "default" },
  variants: {
    fullWidth: {
      true: "w-full",
    },
    size: {
      default: "h-11 px-5 text-sm",
      icon: "size-10",
      lg: "h-12 px-6 text-base",
      sm: "h-9 px-3 text-xs",
    },
    variant: {
      default:
        "bg-primary text-primary-foreground shadow-glow hover:bg-primary/90",
      ghost: "text-foreground hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
      outline:
        "border-border bg-card/80 text-card-foreground hover:border-primary/50 hover:bg-card border",
      // Over photos (project hero): stays light in both themes.
      overlay: "bg-white text-slate-900 hover:bg-white/90",
      overlayOutline: "border border-white/40 text-white hover:bg-white/15",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      social:
        "border-border bg-card text-muted-foreground hover:border-primary/60 hover:text-primary rounded-full border",
    },
  },
});

export type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

/** Without `type`, it renders as `type="button"` so it never submits a form by accident. */
export function Button({
  variant,
  size,
  fullWidth,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={buttonVariants({ className, fullWidth, size, variant })}
      type={type}
    />
  );
}
