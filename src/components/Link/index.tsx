import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";

type LinkProps = ComponentProps<typeof Link>;

export function NextLink({ className, children, ...props }: LinkProps) {
  return (
    <Link
      className={cn(
        "inline-flex items-center gap-2 font-medium text-primary text-sm transition-colors hover:text-primary/80",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
