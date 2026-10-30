import { twMerge } from "tailwind-merge";

/**
 * Joins Tailwind classes resolving conflicts: the last one wins (`cn("px-4", "px-2")` → `px-2`).
 * Use it to accept an outside `className` in components without variants.
 */
export const cn = twMerge;
