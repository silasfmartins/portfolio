# CLAUDE.md

## Executive context
This repository is a personal portfolio built with Next.js App Router and Hygraph as CMS.
The product goal is to present:
- Home overview (hero, skills, highlighted projects, experience, education)
- Projects listing
- Project detail pages
- Contact form

As of **April 1, 2026**, the frontend is being modernized to align with the architecture and UI quality used in the `AutoCore Hub` web frontend, while keeping portfolio identity and existing content.

## Technical baseline
- Runtime: Next.js 16 + React 19
- Language: TypeScript (strict)
- Styling: Tailwind CSS + CSS variables for design tokens
- Lint/format: Biome + Ultracite
- Animations: Framer Motion
- Forms: react-hook-form + zod
- i18n: next-intl (`pt-BR`, `en`)
- Theme: custom provider (`src/components/theme-provider.tsx`)
- Content: Hygraph GraphQL API

## Important files
- Global layout and providers:
  - `src/app/[locale]/layout.tsx`
  - `src/app/[locale]/Providers.tsx`
  - `src/app/[locale]/globals.css`
- i18n and routing:
  - `src/i18n.ts`
  - `src/i18n/request.ts`
  - `src/i18n/routing.ts`
  - `src/navigation.ts`
  - `src/proxy.ts`
  - `messages/pt-BR.json`
  - `messages/en.json`
- CMS data contracts:
  - `src/types/page-info.ts`
  - `src/types/projects.ts`
  - `src/utils/fetch-hygraph-query.ts`
  - `src/lib/hygraph-locale.ts`
  - `src/lib/fallback-content.ts`
- UI primitives:
  - `src/components/ui/*`
  - `src/lib/utils.ts`

## Architecture notes
1. **Locale-first routing**
   - All pages are served under `/[locale]`.
   - Locale handling must remain compatible with `next-intl` middleware.

2. **Server data fetching**
   - Page data is fetched on the server from Hygraph.
   - Keep cache/revalidate behavior stable unless intentionally changing performance characteristics.

3. **Design system direction**
   - Use semantic tokens (`--background`, `--foreground`, `--primary`, etc.).
   - Prefer composition from base UI primitives.
   - Keep strong responsive behavior and avoid desktop-only assumptions.

4. **Motion system**
   - Use Framer Motion for staged reveals and section transitions.
   - Keep animations subtle and not blocking interaction.

## Known issue and fix log
- **Issue (April 1, 2026):** `pnpm dev` failed with
  `[next-intl] Could not locate request configuration module`.
- **Fix applied:** `next.config.mjs` updated to use
  `createNextIntlPlugin('./src/i18n/request.ts')`.
- **Decision (April 1, 2026):** Axios usage is disallowed in this repository.
  All HTTP calls must use native `fetch`.
- **Issue (April 1, 2026):** invalid locale errors from `pt_BR` with `next-intl` v4.
- **Fix applied:** migrated route locale to `pt-BR` and added proxy redirect for legacy URLs.
- **Issue (April 1, 2026):** local dev crash when Hygraph env vars are missing.
- **Fix applied:** explicit env validation in fetch layer + safe fallback content for home/projects.
- **Issue (April 1, 2026):** React console error from script tag inside theme provider.
- **Fix applied:** replaced `next-themes` wrapper with a custom theme provider hook/context without runtime script injection.
- **Issue (April 1, 2026):** runtime image error for Hygraph asset host `sa-east-1.graphassets.com`.
- **Fix applied:** added host to `images.remotePatterns` in `next.config.mjs`.
- **Issue (April 1, 2026):** runtime crash when Hygraph returned `null` for `workExperiences.description`.
- **Fix applied:** made description nullable in types and guarded rendering in experience item component.
- **Issue (April 1, 2026):** layout looked left-biased on wide screens because `.container` lacked centering/padding.
- **Fix applied:** added global `.container` override with `margin-inline: auto` and responsive horizontal padding in `src/app/[locale]/globals.css`.

## Working history snapshot
### April 1, 2026 - modern frontend phase (in progress)
- Dependency upgrade and lock refresh (`package.json`, `pnpm-lock.yaml`, `tsconfig.json`)
- Theme/design token foundation expanded (`tailwind.config.mjs`, `src/app/[locale]/globals.css`)
- Shared UI primitives added (`src/components/ui/*`)
- Theme provider adapter added (`src/components/theme-provider.tsx`)
- Multiple portfolio sections refactored to newer visual patterns:
  - Header/navigation and controls
  - Hero
  - Skills and highlighted projects
  - Experience and education blocks
  - Contact, footer, toaster, utility components
- Axios removed end-to-end:
  - Client contact submit now uses `fetch`
  - API webhook delivery now uses `fetch`
  - Axios removed from all dependency manifests and lockfiles
- Biome + Ultracite toolchain adopted:
  - `biome.jsonc` extends `ultracite/biome/core` and `ultracite/biome/next`
  - scripts now use `ultracite check` and `ultracite fix`
- Runtime hardening pass with live CMS content:
  - Theme handling moved off `next-themes` to avoid script-tag console errors
  - Hygraph region image domain allowed in Next image config
  - Home/projects fallback logs now include real Hygraph error reason
  - Work experience description rendering now tolerates `null` content
- Layout alignment pass:
  - Global `.container` centering and spacing normalized for consistent viewport-centered sections

## Suggested next steps (after current branch changes)
1. Finish remaining page-level visual consistency pass (small polish pass after migration).
2. Run full verification:
   - `pnpm lint`
   - `pnpm build`
   - `pnpm dev` and manual check in both locales and both themes.
3. Update README with the new frontend baseline and design principles.

## Maintenance rule
Whenever a major architectural or UX change is made, append a dated note here and mirror a concise version in `AGENTS.md`.
