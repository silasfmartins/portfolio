'use client'

import { ComponentProps } from 'react'
import { motion } from 'framer-motion'

type TechBadgeProps = ComponentProps<typeof motion.span> & {
  name: string
}

export function TechBadge({ name, ...props }: TechBadgeProps) {
  return (
    <motion.span
      className="flex items-center gap-4 rounded-lg bg-emerald-900/80 px-3 py-1 text-sm text-emerald-400"
      {...props}
    >
      {name}
    </motion.span>
  )
}
