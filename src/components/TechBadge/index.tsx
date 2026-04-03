"use client";

import { motion } from "framer-motion";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type TechBadgeProps = ComponentProps<typeof motion.span> & {
  name: string;
};

export function TechBadge({ name, className, ...props }: TechBadgeProps) {
  return (
    <motion.span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-medium text-primary text-xs",
        className
      )}
      {...props}
    >
      {name}
    </motion.span>
  );
}
