import type { ComponentProps } from "react";
import { cn } from "./cn";
import { fieldClass } from "./input";

export type TextareaProps = ComponentProps<"textarea">;

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      {...props}
      className={cn(fieldClass, "min-h-[132px] py-3", className)}
    />
  );
}
