"use client";

import { motion } from "framer-motion";
import type { ComponentProps } from "react";

import { badgeVariants } from "@/components/ui";

type TechBadgeProps = ComponentProps<typeof motion.span> & {
  name: string;
};

export function TechBadge({ name, className, ...props }: TechBadgeProps) {
  return (
    <motion.span
      {...props}
      className={badgeVariants({ className, variant: "tech" })}
    >
      {name}
    </motion.span>
  );
}
