"use client";

import { motion } from "framer-motion";
import { cn } from "@/components/ui";

interface SectionTitleProps {
  /** `h1` when the title is the page's main heading (projects page); sections use `h2`. */
  as?: "h1" | "h2";
  className?: string;
  subtitle: string;
  title: string;
}

export function SectionTitle({
  as = "h2",
  title,
  subtitle,
  className,
}: SectionTitleProps) {
  const animProps = {
    initial: { opacity: 0, x: -24 },
    viewport: { amount: 0.5, once: true },
    whileInView: { opacity: 1, x: 0 },
  };

  const Heading = as === "h1" ? motion.h1 : motion.h2;

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <motion.span
        className="bg-secondary text-muted-foreground w-fit rounded-full px-3 py-1 font-mono text-xs tracking-[0.14em] uppercase"
        {...animProps}
        transition={{ duration: 0.35 }}
      >
        {subtitle}
      </motion.span>

      <Heading
        className="font-display text-foreground text-3xl font-semibold sm:text-4xl"
        {...animProps}
        transition={{ delay: 0.08, duration: 0.4 }}
      >
        {title}
      </Heading>
    </div>
  );
}
