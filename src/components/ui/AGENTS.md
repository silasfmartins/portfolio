# UI components (`src/components/ui`)

Generic visual building blocks shared by several sections. Every new component here follows the rules below.
Same pattern as Cortix (`barbearia/web/src/components/ui`) and Marmitix (`marmitix/web/src/components/ui`).
`CLAUDE.md` and `AGENTS.md` in this folder are identical copies: when one changes, copy it to the other.

## Current components

| File | Exports | Notes |
| --- | --- | --- |
| `button.tsx` | `Button`, `buttonVariants` | variants `default`, `secondary`, `outline`, `ghost`, `link`, `social` (round icon links), `overlay`/`overlayOutline` (over photos); sizes `default`, `sm`, `lg`, `icon`; `fullWidth` |
| `badge.tsx` | `Badge`, `badgeVariants` | variants `default`, `secondary`, `outline`, `tech` (used by `TechBadge`) |
| `separator.tsx` | `Separator`, `separatorVariants` | `orientation` |
| `card.tsx` | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` | `cn` |
| `input.tsx` | `Input`, `fieldClass` | `fieldClass` is shared with `Textarea` |
| `textarea.tsx` | `Textarea` | |
| `skeleton.tsx` | `Skeleton` | Suspense fallbacks (`src/components/Skeletons`) |
| `cn.ts` | `cn` | `twMerge` |

Outside this folder, the same rules are applied in `Header/NavItem` (slots + `active`), `LocalSwitcher` (`active`), `RichText` (slots + `tone`) and `ProjectsPagination` (`buttonVariants` on links).

## Files and exports

- One component per file, kebab-case name (`button.tsx` exports `Button`).
- Named exports only. Never `export default` (only `page.tsx`/`layout.tsx` and config files need it).
- Every component (and its props and variants) is re-exported from `index.ts`. Everything else imports from `@/components/ui`, never from `@/components/ui/<file>`.
- Compound parts of one component stay in the same file (`Card`, `CardHeader`, `CardContent`...).

## Components with variants: `tailwind-variants`

Use `tv` when the same component has more than one look (variant, size, state).

```tsx
import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

export const badgeVariants = tv({
  base: "inline-flex items-center rounded-full border px-3 py-1 font-medium text-xs",
  variants: {
    variant: {
      default: "border-transparent bg-primary/15 text-primary",
      outline: "border-border/80 text-muted-foreground",
    },
  },
  defaultVariants: { variant: "default" },
});

export type BadgeProps = ComponentProps<"span"> & VariantProps<typeof badgeVariants>;

export function Badge({ variant, className, ...props }: BadgeProps) {
  return <span {...props} className={badgeVariants({ variant, className })} />;
}
```

Rules:

- Export the `tv` as `xVariants` and the type as `XProps = ComponentProps<"element"> & VariantProps<typeof xVariants>`, so the component accepts every native prop (`onClick`, `disabled`, `aria-*`...).
- `className` goes **inside** the `tv` call (`xVariants({ variant, className })`). `tailwind-variants` already merges the classes.
- **Do not** use `cn`/`tailwind-merge` in a component that has `tv`.
- Several styled parts use `slots`: `const styles = xVariants({ active }); styles.base({ className })` (see `Header/NavItem.tsx`).
- Boolean variant: `{ true: "...", false: "..." }` (see `fullWidth` in `Button`, `active` in `LocalSwitcher`).
- A native prop that clashes with the component is removed with `Omit<ComponentProps<"div">, "role">` (see `separator.tsx`).
- Links that look like buttons use `buttonVariants(...)` on the link itself. Never put a `<Button>` inside `<a>`/`<Link>` (invalid HTML).
- Section components outside `ui/` follow the same rule: a state-driven look (active, selected) is a `tv` boolean variant, not a ternary inside `cn`.

## Components without variants: `cn`

With a single look, accept an outside `className` with `cn` (from `./cn`, which is `twMerge`):

```tsx
export function Card({ className, ...props }: ComponentProps<"div">) {
  return <div {...props} className={cn("rounded-2xl border border-border/70 bg-card/80", className)} />;
}
```

## Behavior and accessibility

- Always forward `...props` to the native element.
- `"use client"` only when the component has state, effects or events. Everything in this folder is server-safe today.
- `Button` defaults to `type="button"`; forms pass `type="submit"` explicitly (see `ContactForm`).
- Icons inside `Button` are sized by the base class (`[&_svg]:size-4`).

## Colors and theme

- Theme tokens only (`bg-background`, `bg-card`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-primary`, `text-destructive`, `text-success`...), defined in `src/app/[locale]/globals.css`.
  No fixed colors (`bg-zinc-900`, `#fff`, `rgba(...)`): light/dark theme depends on the tokens.
- Shadows also come from tokens: `shadow-card`, `shadow-elevated`, `shadow-glow`.
- Only exception: content over photos (project detail hero), which must stay light in both themes. Those colors live in the `overlay`/`overlayOutline` button variants and in `ProjectDetails`.

## New component checklist

1. kebab-case file in this folder, named export.
2. `tv` + `xVariants` + `XProps` if it has variants; `cn` if it does not.
3. Native props extended and `...props` forwarded.
4. Re-export in `index.ts`.
5. `pnpm lint` and `pnpm type-check` clean.
