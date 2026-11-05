import type { ComponentProps } from "react";
import { cn } from "./cn";
import { fieldClass } from "./input";

export function Select({ className, ...props }: ComponentProps<"select">) {
  return <select {...props} className={cn(fieldClass, "h-11", className)} />;
}
