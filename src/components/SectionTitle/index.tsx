"use client";

import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

interface SectionTitleProps {
  className?: string;
  subtitle: string;
  title: string;
}

export function SectionTitle({
  title,
  subtitle,
  className,
}: SectionTitleProps) {
  const animProps = {
    initial: { opacity: 0, x: -24 },
    viewport: { amount: 0.5, once: true },
    whileInView: { opacity: 1, x: 0 },
  };

  return (
    <div className={twMerge("flex flex-col gap-4", className)}>
      <motion.span
        className="bg-secondary text-muted-foreground w-fit rounded-full px-3 py-1 font-mono text-xs tracking-[0.14em] uppercase"
        {...animProps}
        transition={{ duration: 0.35 }}
      >
        {subtitle}
      </motion.span>

      <motion.h2
        className="font-display text-foreground text-3xl font-semibold sm:text-4xl"
        {...animProps}
        transition={{ delay: 0.08, duration: 0.4 }}
      >
        {title}
      </motion.h2>
    </div>
  );
}
