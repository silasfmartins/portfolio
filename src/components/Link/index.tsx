import type { ComponentProps } from "react";
import { cn } from "@/components/ui";
import { Link } from "@/navigation";

type LinkProps = ComponentProps<typeof Link>;

export function NextLink({ className, children, ...props }: LinkProps) {
  return (
    <Link
      className={cn(
        "text-primary hover:text-primary/80 inline-flex items-center gap-2 text-sm font-medium transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
