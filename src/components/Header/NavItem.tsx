"use client";

import { tv } from "tailwind-variants";
import { Link, usePathname } from "@/navigation";

const navItemVariants = tv({
  slots: {
    base: "text-muted-foreground hover:text-foreground relative px-1 py-2 text-sm font-medium tracking-wide whitespace-nowrap transition-colors",
    indicator:
      "bg-primary absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full transition-transform",
  },
  variants: {
    active: {
      true: { base: "text-foreground", indicator: "scale-x-100" },
    },
  },
});

interface NavItemProps {
  href: string;
  label: string;
  onNavigate?: () => void;
}

export function NavItem({ label, href, onNavigate }: NavItemProps) {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
  const styles = navItemVariants({ active: isActive });

  return (
    <Link className={styles.base()} href={href} onClick={onNavigate}>
      {label}
      <span className={styles.indicator()} />
    </Link>
  );
}
