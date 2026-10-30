import type { ComponentProps } from "react";
import { cn } from "./cn";

/** Shared look of text fields (`Input` and `Textarea`). */
export const fieldClass =
  "w-full rounded-lg border border-input bg-background/80 px-3 text-foreground text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60";

export type InputProps = ComponentProps<"input">;

export function Input({ className, type = "text", ...props }: InputProps) {
  return (
    <input
      {...props}
      className={cn(fieldClass, "h-11", className)}
      type={type}
    />
  );
}
