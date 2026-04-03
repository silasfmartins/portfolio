# AGENTS.md

## Mission
Keep this portfolio modern, fast, and easy to maintain while preserving the personal style and content.

## Project context
- Name: `portfolio`
- Root: `/Users/silasmartins/Programacao/Pessoal/portfolio`
- Framework: Next.js (App Router) + TypeScript
- Styling: Tailwind CSS + custom design tokens in `src/app/[locale]/globals.css`
- i18n: `next-intl` with locales `pt-BR` and `en`
- Theme: custom provider in `src/components/theme-provider.tsx` (no `next-themes` runtime script)
- Data source: Hygraph GraphQL (`src/utils/fetch-hygraph-query.ts`)

## Main structure
- `src/app/[locale]/*`: pages, layout, loading, not-found
- `src/components/*`: portfolio sections and shared UI
- `src/components/ui/*`: base UI primitives (button, card, input, etc.)
- `src/types/*`: content and page data contracts
- `messages/*.json`: translations
- `public/images/*`: static image assets

## Runbook
- Install: `pnpm install`
- Dev server: `pnpm dev`
- Build: `pnpm build`
- Lint: `pnpm lint`
- Format: `pnpm format`

## Frontend conventions
1. Reuse `src/components/ui/*` primitives before creating one-off styles.
2. Keep colors and radius aligned with CSS variables in `globals.css`.
3. Preserve responsive behavior for mobile first, then desktop.
4. Preserve i18n: all visible text should come from `messages/*.json` when practical.
5. Keep motion subtle and meaningful (Framer Motion already used across sections).

## Data and content conventions
- Home and projects pages are fetched from Hygraph.
- Avoid changing GraphQL field names unless types and components are updated together.
- Keep `revalidate` behavior in server fetches unless there is a clear reason to change caching.

## Known technical notes
- `next-intl` config is explicitly wired in `next.config.mjs` with `createNextIntlPlugin('./src/i18n/request.ts')`.
- Locale middleware now uses `src/proxy.ts` (Next.js proxy convention).
- Legacy locale URLs (`/pt_BR`) are redirected to `/pt-BR` in `src/proxy.ts`.
- This codebase must not use Axios. Use native `fetch` for client/server HTTP calls.
- Lint and formatting use Biome via Ultracite (`biome.jsonc`, scripts `ultracite check/fix`).
- Hygraph images require both `media.graphassets.com` and `sa-east-1.graphassets.com` allowed in `next.config.mjs`.

## Project history (living log)
- **April 1, 2026**: dependency stack upgraded to modern Next.js/React/Tailwind versions (`package.json`, `pnpm-lock.yaml`, `tsconfig.json`).
- **April 1, 2026**: i18n boot issue fixed by explicitly pointing `next-intl` plugin to `src/i18n/request.ts` (`next.config.mjs`).
- **April 1, 2026**: frontend modernization started based on patterns from AutoCore Hub web frontend:
  - Design tokens and global theme refresh (`src/app/[locale]/globals.css`, `tailwind.config.mjs`)
  - UI primitives foundation (`src/components/ui/*`, `src/lib/utils.ts`, `src/components/theme-provider.tsx`)
  - Layout and section visual refresh in progress (`src/app/[locale]/layout.tsx`, `src/app/[locale]/Providers.tsx`, multiple `src/components/*` files)
- **April 1, 2026**: Axios fully removed from the project.
  - Replaced client form submit call with native `fetch` (`src/components/ContactForm/index.tsx`)
  - Replaced webhook request in API route with native `fetch` (`src/app/[locale]/api/contact/route.ts`)
  - Removed Axios from dependencies and lockfiles (`package.json`, `pnpm-lock.yaml`, `package-lock.json`)
- **April 1, 2026**: locale and fallback stability improvements.
  - Locale IDs normalized to Unicode format (`pt-BR`) for `next-intl`
  - Backward-compatible redirect `/pt_BR` → `/pt-BR` in proxy
  - Hygraph fallback data added for local/dev runs without env vars (`src/lib/fallback-content.ts`)
- **April 1, 2026**: Biome + Ultracite adopted as the code quality toolchain.
  - Added `biome.jsonc` extending Ultracite presets
  - Added scripts `pnpm lint` (`ultracite check`) and `pnpm format` (`ultracite fix`)
- **April 1, 2026**: runtime stability fixes after enabling live Hygraph data.
  - Replaced `next-themes` provider wrapper with a custom client theme provider to remove React script-tag console errors
  - Added `sa-east-1.graphassets.com` to Next.js image remote patterns
  - Hardened homepage/project fallback logs with real Hygraph error details
  - Prevented crashes when a work experience has `description: null`
- **April 1, 2026**: container layout centering fix.
  - Added global `.container` utility overrides (auto horizontal margins + responsive side paddings) in `src/app/[locale]/globals.css`
  - This aligns header and page sections around the center of the viewport on large screens
- **April 3, 2026**: Next.js modern rendering/caching parity pass inspired by AutoCore Hub.
  - Kept `cacheComponents: true` enabled and adopted request-level streaming with `Suspense`
  - Migrated App Router usage to `React.use()` for `params` in layout/pages and split locale providers into a Suspense-wrapped boundary
  - Added `generateStaticParams` for locale segment to prebuild known locales
  - Added `unstable_cache` for home/projects/project-detail CMS fetches with 1-day revalidation and cache tags
  - Hardened project image rendering for nullable CMS image fields (`thumbnail`, `pageThumbnail`, `sections.image`) using local fallback image
  - Eliminated i18n Suspense waterfall in locale layout by starting request-bound reads in parallel (`Promise.all`) before `use()`
- **April 3, 2026**: composition pattern refactor to reduce prop drilling.
  - `Providers` now acts as a composition shell and no longer receives nested `header/contact/footer` config objects
  - `layout.tsx` composes `Header`, `<main>`, `ContactForm`, and `Footer` explicitly inside `Providers`
  - `ContactForm` now receives a single `copy` object plus `children` slot for heading content instead of many isolated text props
- **April 3, 2026**: compound components + request deduplication pass.
  - `ContactForm` refactored to compound components with shared Context (`ContactFormRoot`, `ContactFormTitle`, `ContactFormPanel`, `ContactFormForm`, `ContactFormFields`, `ContactFormSubmitButton`)
  - Kept server/client compatibility by consuming compound parts as named client exports in `layout.tsx` (avoids RSC proxy issues from static object access)
  - Added per-request deduplication wrappers via React `cache()` for i18n bundle and page-level async reads (`/[locale]`, `/projects`, `/projects/[slug]`)
  - Simplified derived render data in header (`navItems`) by deriving directly during render instead of memoized state-like indirection
- **April 3, 2026**: state-derivation cleanup pass.
  - Removed effect-driven derived theme state in `theme-provider` and now derive `resolvedTheme` during render
  - Subscribed to OS theme changes with `useSyncExternalStore` and kept only source-of-truth state (`theme`)
  - Removed `mounted` state/effect gate from `ThemeSwitcher` and now render directly from context-derived `resolvedTheme`

## Collaboration checklist for next edits
- Run `pnpm dev` and confirm no runtime errors.
- If touching i18n routes or locale switch, test both `pt-BR` and `en` paths.
- If touching section layout, verify home + projects + project details pages.
- Keep this file and `CLAUDE.md` updated when major architectural changes happen.
