import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "secondary" | "outline" | "ghost" | "link";
type ButtonSize = "default" | "sm" | "lg" | "icon";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
}

const baseClassName =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-60 [&_svg]:h-4 [&_svg]:w-4";

const variantClassNames: Record<ButtonVariant, string> = {
  default:
    "bg-primary text-primary-foreground shadow-[0_12px_28px_-14px_hsl(var(--primary)/0.8)] hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  outline:
    "border border-border bg-card/80 text-card-foreground hover:border-primary/50 hover:bg-card",
  ghost: "text-foreground hover:bg-accent hover:text-accent-foreground",
  link: "text-primary underline-offset-4 hover:underline",
};

const sizeClassNames: Record<ButtonSize, string> = {
  default: "h-11 px-5 text-sm",
  sm: "h-9 px-3 text-xs",
  lg: "h-12 px-6 text-base",
  icon: "h-10 w-10",
};

export function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        baseClassName,
        variantClassNames[variant],
        sizeClassNames[size],
        className
      )}
      {...props}
    />
  );
}
