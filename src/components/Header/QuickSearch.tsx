"use client";

import {
  CornerDownLeft,
  FolderGit2,
  FolderKanban,
  House,
  Mail,
  Search,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { parseAsString, useQueryState } from "nuqs";
import { useEffect, useEffectEvent, useRef, useState } from "react";

import { Button, cn } from "@/components/ui";
import { matchesSearch } from "@/lib/search";
import { useRouter } from "@/navigation";

const PAGE_ICONS = {
  contact: Mail,
  home: House,
  privacy: ShieldCheck,
  projects: FolderKanban,
};

export interface QuickItem {
  description?: string;
  group: "pages" | "projects";
  href: string;
  /** Pages use an icon; projects use their thumbnail. */
  icon?: keyof typeof PAGE_ICONS;
  label: string;
  thumbnail?: string;
}

interface QuickOptionProps {
  index: number;
  isActive: boolean;
  item: QuickItem;
  onHover: () => void;
  onSelect: () => void;
}

function QuickOption({
  index,
  isActive,
  item,
  onHover,
  onSelect,
}: QuickOptionProps) {
  const Icon = item.icon ? PAGE_ICONS[item.icon] : FolderGit2;

  return (
    <button
      aria-selected={isActive}
      className={cn(
        "flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left",
        isActive && "bg-accent text-accent-foreground"
      )}
      id={`quick-search-${index}`}
      onClick={onSelect}
      onMouseEnter={onHover}
      role="option"
      tabIndex={-1}
      type="button"
    >
      {item.thumbnail ? (
        <Image
          alt=""
          className="border-border/70 bg-muted/40 aspect-video w-20 shrink-0 rounded-lg border object-contain"
          height={45}
          src={item.thumbnail}
          width={80}
        />
      ) : (
        <span className="border-border/70 bg-background/60 text-primary flex size-11 shrink-0 items-center justify-center rounded-lg border">
          <Icon className="size-4" />
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium">{item.label}</span>
        {item.description && (
          <span className="text-muted-foreground block truncate text-xs">
            {item.description}
          </span>
        )}
      </span>
      {isActive && <CornerDownLeft className="size-4 shrink-0 opacity-70" />}
    </button>
  );
}

function Key({ children }: { children: string }) {
  return (
    <kbd className="border-border bg-background/60 rounded border px-1.5 py-0.5 font-sans text-[10px]">
      {children}
    </kbd>
  );
}

interface QuickSearchProps {
  items: QuickItem[];
}

/**
 * Ctrl+K or ⌘K opens the search modal; arrows choose, Enter opens, Esc closes.
 * The open state and the text live in the URL (`?search=`), so a link can open it.
 */
export function QuickSearch({ items }: QuickSearchProps) {
  const t = useTranslations("Header");
  const router = useRouter();
  const dialog = useRef<HTMLDialogElement>(null);
  const [search, setSearch] = useQueryState("search", parseAsString);
  const [active, setActive] = useState(0);
  const isOpen = search !== null;
  const query = search ?? "";

  const matches = items.filter((item) =>
    matchesSearch(`${item.label} ${item.description ?? ""}`, query)
  );
  const pages = matches.filter((item) => item.group === "pages");
  const projects = matches.filter((item) => item.group === "projects");
  const results = [...pages, ...projects];
  const groups = [
    { items: pages, offset: 0, title: t("quickSearchPages") },
    { items: projects, offset: pages.length, title: t("quickSearchProjects") },
  ].filter((group) => group.items.length > 0);

  function openSearch() {
    setActive(0);
    setSearch("", { clearOnDefault: false });
  }

  const handleShortcut = useEffectEvent((event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      openSearch();
    }
  });

  useEffect(() => {
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  useEffect(() => {
    if (isOpen && !dialog.current?.open) {
      dialog.current?.showModal();
    } else if (!isOpen && dialog.current?.open) {
      dialog.current.close();
    }
  }, [isOpen]);

  useEffect(() => {
    document
      .querySelector(`#quick-search-${active}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  async function go(item: QuickItem | undefined) {
    if (item) {
      // The parameter is cleared first so it does not rewrite the URL after navigating.
      await setSearch(null);
      router.push(item.href);
    }
  }

  function handleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((current) => Math.min(current + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((current) => Math.max(current - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      go(results[active]);
    }
  }

  return (
    <>
      <Button onClick={openSearch} size="sm" variant="outline">
        <Search />
        {t("quickSearchButton")}
        <kbd className="border-border rounded border px-1 font-sans text-[10px]">
          Ctrl K
        </kbd>
      </Button>

      {/* biome-ignore lint/a11y/useKeyWithClickEvents: only closes on a backdrop click; the native dialog already closes on Esc */}
      <dialog
        aria-label={t("quickSearch")}
        className="border-border bg-card text-card-foreground backdrop:bg-background/70 shadow-elevated fixed inset-x-0 top-[12vh] mx-auto w-[calc(100%-2rem)] max-w-xl overflow-hidden rounded-2xl border backdrop:backdrop-blur-sm"
        onClick={(event) => {
          if (event.target === dialog.current) {
            setSearch(null);
          }
        }}
        onClose={() => setSearch(null)}
        ref={dialog}
      >
        <div className="border-border flex items-center gap-3 border-b px-4">
          <Search className="text-muted-foreground size-4 shrink-0" />
          <input
            aria-activedescendant={
              results[active] ? `quick-search-${active}` : undefined
            }
            aria-controls="quick-search-results"
            aria-expanded="true"
            aria-label={t("quickSearchInput")}
            className="placeholder:text-muted-foreground w-full bg-transparent py-4 text-sm outline-none"
            onChange={(event) => {
              setSearch(event.target.value, { clearOnDefault: false });
              setActive(0);
            }}
            onKeyDown={handleInputKeyDown}
            placeholder={t("quickSearchInput")}
            role="combobox"
            value={query}
          />
        </div>

        <div
          aria-label={t("quickSearchResults")}
          className="max-h-[min(26rem,55vh)] space-y-3 overflow-y-auto p-2"
          id="quick-search-results"
          role="listbox"
        >
          {results.length === 0 && (
            <p className="text-muted-foreground px-3 py-8 text-center text-sm">
              {t("quickSearchEmpty")}
            </p>
          )}
          {groups.map((group) => (
            <div aria-label={group.title} key={group.title} role="group">
              <p className="text-muted-foreground px-2.5 pt-1 pb-1.5 font-mono text-[11px] tracking-[0.14em] uppercase">
                {group.title}
              </p>
              {group.items.map((item, position) => {
                const index = group.offset + position;

                return (
                  <QuickOption
                    index={index}
                    isActive={index === active}
                    item={item}
                    key={item.href}
                    onHover={() => setActive(index)}
                    onSelect={() => go(item)}
                  />
                );
              })}
            </div>
          ))}
        </div>

        <div className="border-border text-muted-foreground flex items-center gap-4 border-t px-4 py-2.5 text-xs">
          <span className="flex items-center gap-1.5">
            <Key>↑</Key>
            <Key>↓</Key>
            {t("quickSearchNavigate")}
          </span>
          <span className="flex items-center gap-1.5">
            <Key>Enter</Key>
            {t("quickSearchOpen")}
          </span>
          <span className="flex items-center gap-1.5">
            <Key>Esc</Key>
            {t("quickSearchClose")}
          </span>
        </div>
      </dialog>
    </>
  );
}
