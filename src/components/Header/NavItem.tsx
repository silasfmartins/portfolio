"use client";

import { cn } from "@/lib/utils";
import { Link, usePathname } from "@/navigation";

interface NavItemProps {
  href: string;
  label: string;
  onNavigate?: () => void;
}

export function NavItem({ label, href, onNavigate }: NavItemProps) {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <Link
      className={cn(
        "relative px-1 py-2 font-medium text-muted-foreground text-sm tracking-wide transition-colors hover:text-foreground",
        isActive && "text-foreground"
      )}
      href={href}
      onClick={onNavigate}
    >
      {label}
      <span
        className={cn(
          "absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-primary transition-transform",
          isActive && "scale-x-100"
        )}
      />
    </Link>
  );
}
