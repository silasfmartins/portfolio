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
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, amount: 0.5 },
  };

  return (
    <div className={twMerge("flex flex-col gap-4", className)}>
      <motion.span
        className="w-fit rounded-full bg-secondary px-3 py-1 font-mono text-muted-foreground text-xs uppercase tracking-[0.14em]"
        {...animProps}
        transition={{ duration: 0.35 }}
      >
        {subtitle}
      </motion.span>

      <motion.h2
        className="font-display font-semibold text-3xl text-foreground sm:text-4xl"
        {...animProps}
        transition={{ duration: 0.4, delay: 0.08 }}
      >
        {title}
      </motion.h2>
    </div>
  );
}
