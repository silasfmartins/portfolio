"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";

type Theme = "light" | "dark" | "system";
type ResolvedTheme = Exclude<Theme, "system">;

interface ThemeContextValue {
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  theme: Theme;
}

interface ApplyThemeParams {
  attribute: "class" | `data-${string}`;
  disableTransitionOnChange: boolean;
  value: ResolvedTheme;
}

export interface ThemeProviderProps {
  attribute?: "class" | `data-${string}`;
  children: ReactNode;
  defaultTheme?: Theme;
  disableTransitionOnChange?: boolean;
  enableSystem?: boolean;
  storageKey?: string;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
const THEME_STORAGE_VALUES: Theme[] = ["light", "dark", "system"];
const MEDIA_QUERY_DARK = "(prefers-color-scheme: dark)";

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia(MEDIA_QUERY_DARK).matches ? "dark" : "light";
}

function getSystemThemeOnServer(): ResolvedTheme {
  return "light";
}

function subscribeToSystemTheme(onStoreChange: () => void): () => void {
  const mediaQuery = window.matchMedia(MEDIA_QUERY_DARK);
  mediaQuery.addEventListener("change", onStoreChange);

  return () => {
    mediaQuery.removeEventListener("change", onStoreChange);
  };
}

function disableTransitionsTemporarily(): () => void {
  const style = document.createElement("style");

  style.appendChild(
    document.createTextNode(
      "*,*::before,*::after{transition:none!important;animation:none!important}"
    )
  );
  document.head.appendChild(style);

  return () => {
    window.getComputedStyle(document.body);
    requestAnimationFrame(() => {
      document.head.removeChild(style);
    });
  };
}

function applyTheme({
  attribute,
  disableTransitionOnChange,
  value,
}: ApplyThemeParams): void {
  const root = document.documentElement;
  const removeDisableStyles = disableTransitionOnChange
    ? disableTransitionsTemporarily()
    : undefined;

  if (attribute === "class") {
    root.classList.remove("light", "dark");
    root.classList.add(value);
  } else {
    root.setAttribute(attribute, value);
  }

  root.style.colorScheme = value;
  removeDisableStyles?.();
}

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "system",
  disableTransitionOnChange = false,
  enableSystem = true,
  storageKey = "theme",
}: ThemeProviderProps) {
  const normalizedDefaultTheme =
    !enableSystem && defaultTheme === "system" ? "light" : defaultTheme;

  const [theme, setThemeState] = useState<Theme>(normalizedDefaultTheme);

  const systemTheme = useSyncExternalStore(
    subscribeToSystemTheme,
    getSystemTheme,
    getSystemThemeOnServer
  );

  const resolvedTheme: ResolvedTheme =
    theme === "system" ? (enableSystem ? systemTheme : "light") : theme;

  useEffect(() => {
    const storageTheme = window.localStorage.getItem(storageKey);
    if (
      storageTheme &&
      THEME_STORAGE_VALUES.includes(storageTheme as Theme) &&
      (enableSystem || storageTheme !== "system")
    ) {
      setThemeState(storageTheme as Theme);
      return;
    }

    setThemeState(normalizedDefaultTheme);
  }, [normalizedDefaultTheme, enableSystem, storageKey]);

  useEffect(() => {
    applyTheme({
      attribute,
      disableTransitionOnChange,
      value: resolvedTheme,
    });
  }, [attribute, disableTransitionOnChange, resolvedTheme]);

  const setTheme = useCallback(
    (nextTheme: Theme) => {
      const normalizedTheme =
        !enableSystem && nextTheme === "system" ? "light" : nextTheme;

      setThemeState(normalizedTheme);
      window.localStorage.setItem(storageKey, normalizedTheme);
    },
    [enableSystem, storageKey]
  );

  const contextValue = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
    }),
    [theme, resolvedTheme, setTheme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
