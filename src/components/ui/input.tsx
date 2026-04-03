import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, type = "text", ...props }: InputProps) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-lg border border-input bg-background/80 px-3 text-foreground text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60",
        className
      )}
      type={type}
      {...props}
    />
  );
}
