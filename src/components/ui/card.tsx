import type { ComponentProps } from "react";
import { cn } from "./cn";

/** Surface with border and soft shadow. Base for most content blocks. */
export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        "border-border/70 bg-card/80 text-card-foreground shadow-card rounded-2xl border backdrop-blur-sm",
        className
      )}
    />
  );
}

export function CardHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div {...props} className={cn("flex flex-col gap-2 p-6", className)} />
  );
}

export function CardTitle({ className, ...props }: ComponentProps<"h3">) {
  return (
    <h3
      {...props}
      className={cn(
        "text-foreground text-lg font-semibold tracking-tight",
        className
      )}
    />
  );
}

export function CardDescription({ className, ...props }: ComponentProps<"p">) {
  return (
    <p {...props} className={cn("text-muted-foreground text-sm", className)} />
  );
}

export function CardContent({ className, ...props }: ComponentProps<"div">) {
  return <div {...props} className={cn("px-6 pb-6", className)} />;
}

export function CardFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn("flex items-center gap-3 px-6 pb-6", className)}
    />
  );
}
