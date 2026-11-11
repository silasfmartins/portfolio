"use client";

import { Menu, X } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Activity, useState } from "react";
import Logo from "@/assets/logo.png";
import { Button, Skeleton } from "@/components/ui";
import { Link } from "@/navigation";
import { LocalSwitcher } from "../LocalSwitcher";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { NavItem } from "./NavItem";
import type { QuickItem } from "./QuickSearch";

// Runs only in the browser: reading the URL during prerender would make every page dynamic.
const QuickSearch = dynamic(
  () => import("./QuickSearch").then((module) => module.QuickSearch),
  { loading: () => <Skeleton className="h-9 w-32" />, ssr: false }
);

interface HeaderParams {
  /** Home, projects, resume (view first, download there) and contact. */
  navItems: { href: string; label: string }[];
  searchItems: QuickItem[];
}

export function Header({ navItems, searchItems }: HeaderParams) {
  const t = useTranslations("Header");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-border/60 bg-background/80 sticky top-0 z-40 border-b backdrop-blur-xl">
      <div className="container flex h-20 items-center justify-between gap-4">
        <Link className="flex items-center gap-3" href="/">
          <Image
            alt="Logo Silas Martins"
            height={42}
            priority
            src={Logo}
            width={42}
          />
          <div className="hidden flex-col lg:flex">
            <span className="font-display text-foreground text-sm font-semibold tracking-wide">
              Silas Martins
            </span>
            <span className="text-muted-foreground text-[11px] tracking-[0.14em] uppercase">
              Fullstack • DevOps
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-4 md:flex lg:gap-7">
          {navItems.map((item) => (
            <NavItem key={item.href} {...item} />
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <QuickSearch items={searchItems} />
          <LocalSwitcher />
          <ThemeSwitcher />
        </div>

        <Button
          aria-label={t(menuOpen ? "closeMenu" : "openMenu")}
          className="md:hidden"
          onClick={() => setMenuOpen((current) => !current)}
          size="icon"
          type="button"
          variant="ghost"
        >
          {menuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      <Activity mode={menuOpen ? "visible" : "hidden"}>
        <div className="border-border/70 bg-background/95 border-t md:hidden">
          <div className="container flex flex-col gap-3 py-4">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <NavItem
                  key={item.href}
                  {...item}
                  onNavigate={() => setMenuOpen(false)}
                />
              ))}
            </nav>
            <div className="border-border/70 flex items-center justify-between gap-3 border-t pt-3">
              <LocalSwitcher />
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </Activity>
    </header>
  );
}
