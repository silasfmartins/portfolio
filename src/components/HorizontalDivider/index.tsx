import { twMerge } from "tailwind-merge";

import { Separator } from "@/components/ui/separator";

interface HorizontalDividerProps {
  className?: string;
}

export function HorizontalDivider({ className }: HorizontalDividerProps) {
  return <Separator className={twMerge("my-10", className)} />;
}
