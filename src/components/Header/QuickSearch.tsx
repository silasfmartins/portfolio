"use client";

import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { parseAsString, useQueryState } from "nuqs";
import { useEffect, useEffectEvent, useRef, useState } from "react";

import { Button, cn } from "@/components/ui";
import { matchesSearch } from "@/lib/search";
import { useRouter } from "@/navigation";

const MAX_RESULTS = 8;

export interface QuickItem {
  href: string;
  /** Extra words that also find the item (a project's technologies). */
  keywords?: string;
  label: string;
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

  const results = items
    .filter((item) =>
      matchesSearch(`${item.label} ${item.keywords ?? ""}`, query)
    )
    .slice(0, MAX_RESULTS);

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
        className="border-border bg-card text-card-foreground backdrop:bg-background/70 shadow-elevated fixed inset-x-0 top-[15vh] mx-auto w-[calc(100%-2rem)] max-w-lg overflow-hidden rounded-2xl border backdrop:backdrop-blur-sm"
        onClick={(event) => {
          if (event.target === dialog.current) {
            setSearch(null);
          }
        }}
        onClose={() => setSearch(null)}
        ref={dialog}
      >
        <input
          aria-activedescendant={
            results[active] ? `quick-search-${active}` : undefined
          }
          aria-controls="quick-search-results"
          aria-expanded="true"
          aria-label={t("quickSearchInput")}
          className="border-border w-full border-b bg-transparent px-4 py-3 text-sm outline-none"
          onChange={(event) => {
            setSearch(event.target.value, { clearOnDefault: false });
            setActive(0);
          }}
          onKeyDown={handleInputKeyDown}
          placeholder={t("quickSearchInput")}
          role="combobox"
          value={query}
        />
        <div
          aria-label={t("quickSearchResults")}
          className="max-h-80 overflow-y-auto p-2"
          id="quick-search-results"
          role="listbox"
        >
          {results.length === 0 && (
            <p className="text-muted-foreground px-3 py-2 text-sm">
              {t("quickSearchEmpty")}
            </p>
          )}
          {results.map((item, index) => (
            <button
              aria-selected={index === active}
              className={cn(
                "block w-full rounded-lg px-3 py-2 text-left text-sm",
                index === active && "bg-accent text-accent-foreground"
              )}
              id={`quick-search-${index}`}
              key={`${item.href}-${item.label}`}
              onClick={() => go(item)}
              onMouseEnter={() => setActive(index)}
              role="option"
              tabIndex={-1}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>
      </dialog>
    </>
  );
}
