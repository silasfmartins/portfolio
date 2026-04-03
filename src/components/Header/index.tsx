"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import LocalSwitcher from "../LocalSwitcher";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { NavItem } from "./NavItem";

interface HeaderParams {
  indexHeader: string;
  projectsHeader: string;
}

export function Header({ indexHeader, projectsHeader }: HeaderParams) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: indexHeader, href: "/" },
    { label: projectsHeader, href: "/projects" },
  ];

  return (
    <header className="sticky top-0 z-40 border-border/60 border-b bg-background/80 backdrop-blur-xl">
      <div className="container flex h-20 items-center justify-between gap-4">
        <Link className="flex items-center gap-3" href="/">
          <Image
            alt="Logo Silas Martins"
            height={42}
            priority
            src={Logo}
            width={42}
          />
          <div className="hidden flex-col sm:flex">
            <span className="font-display font-semibold text-foreground text-sm tracking-wide">
              Silas Martins
            </span>
            <span className="text-[11px] text-muted-foreground uppercase tracking-[0.14em]">
              Fullstack • DevOps
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <NavItem key={item.href} {...item} />
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LocalSwitcher />
          <ThemeSwitcher />
        </div>

        <Button
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
          onClick={() => setMenuOpen((current) => !current)}
          size="icon"
          type="button"
          variant="ghost"
        >
          {menuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {menuOpen && (
        <div className="border-border/70 border-t bg-background/95 md:hidden">
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
            <div className="flex items-center justify-between gap-3 border-border/70 border-t pt-3">
              <LocalSwitcher />
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
