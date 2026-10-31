# AGENTS.md

## Mission
Keep this portfolio modern, fast, and easy to maintain while preserving the personal style and content.

## Project context
- Name: `portfolio`
- Root: `/Users/silasmartins/Programacao/Pessoal/portfolio`
- Framework: Next.js (App Router) + TypeScript
- Styling: Tailwind CSS v4 (CSS-first, `@theme inline`) + custom design tokens in `src/app/[locale]/globals.css`
- Component styling: `tailwind-variants` + `tailwind-merge`, same rules as Cortix and Marmitix (`src/components/ui/AGENTS.md`)
- Package manager: pnpm 11 (pinned via `packageManager`)
- i18n: `next-intl` with locales `pt-BR` and `en`
- Theme: custom provider in `src/components/theme-provider.tsx` (no `next-themes` runtime script)
- Data source: Hygraph GraphQL (`src/utils/fetch-hygraph-query.ts`)

## Main structure
- `src/app/[locale]/*`: pages, layout, loading, not-found
- `src/app/[locale]/projects/projects-content.tsx`: paginated projects query + content shared by `/projects` and `/projects/page/[page]`
- `src/components/*`: portfolio sections and shared UI
- `src/components/ui/*`: base UI primitives (button, card, input, etc.), re-exported from `index.ts`; pattern in `src/components/ui/AGENTS.md`
- `src/types/*`: content and page data contracts
- `messages/*.json`: translations
- `public/images/*`: static image assets

## Runbook
- Install: `pnpm install`
- Dev server: `pnpm dev`
- Build: `pnpm build`
- Lint: `pnpm lint`
- Format: `pnpm format`
- Types: `pnpm type-check`

## Frontend conventions
1. Reuse `src/components/ui/*` primitives before creating one-off styles; import them from `@/components/ui`.
2. Colors, radius, fonts and shadows only through tokens in `globals.css` (`:root`/`.dark` + `@theme inline`). No fixed colors, except content over photos.
3. Variants with `tv` (`xVariants` + `XProps`, `className` inside the call, no `cn`); single-look components with `cn`. State-driven looks are boolean `tv` variants.
4. Named exports only (except Next `page.tsx`/`layout.tsx` and config files).
5. Links styled as buttons use `buttonVariants(...)`; `Button` defaults to `type="button"`.
6. Preserve responsive behavior for mobile first, then desktop.
7. Preserve i18n: all visible text should come from `messages/*.json` when practical.
8. Keep motion subtle and meaningful (Framer Motion already used across sections).

## Data and content conventions
- Home and projects pages are fetched from Hygraph.
- Avoid changing GraphQL field names unless types and components are updated together.
- Keep `revalidate` behavior in server fetches unless there is a clear reason to change caching.

## Known technical notes
- `next-intl` config is explicitly wired in `next.config.mjs` with `createNextIntlPlugin('./src/i18n/request.ts')`.
- Locale middleware now uses `src/proxy.ts` (Next.js proxy convention).
- Legacy locale URLs (`/pt_BR`) are redirected to `/pt-BR` in `src/proxy.ts`.
- This codebase must not use Axios. Use native `fetch` for client/server HTTP calls.
- Lint and formatting use Biome via Ultracite (`biome.jsonc`, scripts `ultracite check/fix`); Ultracite already sorts classes inside `cn` and `tv`. No Prettier.
- Rule suppressions only with a written reason (`// biome-ignore lint/group/rule: reason`, or a comment next to the rule in `biome.jsonc`).
- Tailwind v4 does not read `tailwind.config.*`; the theme lives in `globals.css`. `next/font` uses `--font-manrope`/`--font-jetbrains-mono` (not `--font-sans`/`--font-mono`, which belong to Tailwind).
- Use pnpm 11 (pinned via `packageManager`); do not install with npm or pnpm 12, or the lockfile drifts from what Vercel runs.
- `cacheComponents` + `partialPrefetching` are both on. Read `params` inside a Suspense child on routes with per-URL params (`[slug]`); keep `use(params)` at the top for `locale`, which is static (`generateStaticParams`) and keeps home/projects fully static. Check `pnpm build` still lists `/pt-BR` and `/en` as `○` after touching pages.
- Projects list is paginated at `PROJECTS_PER_PAGE` (10): `/projects` is page 1, `/projects/page/[page]` are pages 2..N, all static. Keep pagination in route segments (not `searchParams`) so pages stay prerendered; page links go through `getProjectsPageHref`.
- Never catch errors inside `unstable_cache`: a cached fallback would be served for a day. Fetch inside `unstable_cache`, handle the fallback in the request-level `cache()` wrapper.
- Hygraph caps every list (top-level and nested relations) at 10 items unless `first` is set. Every list field in a query must use `first: 100`.
- CMS icons (`iconSvg`) go through `CMSIcon`, which sanitizes and normalizes them (`currentColor` for single-color icons, `1em`). Prefer single-color SVGs in Hygraph; broken path data must be fixed in Hygraph. After editing content, clear `.next/cache/fetch-cache` locally to see it (CMS reads are cached for 1 day).
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
- **April 3, 2026**: React Activity boundaries adoption pass.
  - Replaced mobile menu conditional unmount in header with `<Activity mode={...}>` to preserve UI state and avoid full remount churn (`src/components/Header/index.tsx`)
  - Added always-visible Activity boundaries around major route sections in home/projects/project-detail pages to improve selective hydration splitting (`src/app/[locale]/page.tsx`, `src/app/[locale]/projects/page.tsx`, `src/app/[locale]/projects/[slug]/page.tsx`)
- **April 3, 2026**: request/streaming UX polish pass.
  - API contact route now uses `NextRequest` + `NextResponse` end-to-end for request/response handling (`src/app/[locale]/api/contact/route.ts`)
  - Added reusable skeleton primitives/components for Suspense fallbacks (`src/components/ui/skeleton.tsx`, `src/components/Skeletons/*`)
  - Replaced generic Suspense fallbacks with explicit skeleton screens and loading status text in layout/home/projects/project-details
- **October 30, 2026**: Vercel deploy fix after dependency upgrade.
  - Pinned `packageManager: pnpm@11.28.10` (Vercel defaulted to pnpm 9, which rejects `pnpm-workspace.yaml` without `packages`); removed stray `package-lock.json` and regenerated `pnpm-lock.yaml`
  - `tsconfig.json` aligned with the Node 26 preset (`target`/`lib` es2025, Collection, Temporal) since TypeScript 7 dropped `target: es5`
  - `profilePicture` made nullable with `/images/hero-bg.png` fallback in `HomeHero`
- **October 30, 2026**: Tailwind v4 theme + Cortix/Marmitix UI pattern alignment.
  - Theme moved from the ignored `tailwind.config.mjs` to `@theme inline` and `@custom-variant dark` in `globals.css`; token utilities now ship in production CSS
  - `tailwind-variants` adopted: `ui/*` rewritten with `tv`/`cn`, barrel `src/components/ui/index.ts`, `src/lib/utils.ts` and `components/Button` removed
  - `NavItem` and `LocalSwitcher` active states as `tv` boolean variants; `TechBadge` uses `badgeVariants({ variant: "tech" })`
  - Buttons nested in links replaced by `buttonVariants` (`ProjectDetails`, `not-found`); contact submit now `type="submit"`
  - Hardcoded colors replaced by tokens (`--success`, `shadow-card`, `shadow-elevated`); dead `SoftSkills`, unused assets and Prettier removed
  - `src/components/ui/CLAUDE.md`/`AGENTS.md` added with the component rules
- **October 30, 2026**: Partial Prefetching enabled (`next.config.mjs`); project detail page awaits `params` inside Suspense.
- **October 31, 2026**: `CMSIcon` normalizes CMS SVG colors and sizes (Playwright/Docker invisible in light theme fixed).
- **October 31, 2026**: all Hygraph list fields query `first: 100` (projects page had only 10 of 14 projects).
- **October 31, 2026**: projects page paginated at 10 per page (`/projects/page/[page]`, prerendered, i18n labels in `IndexProjects`).

## Collaboration checklist for next edits
- Run `pnpm dev` and confirm no runtime errors.
- If touching i18n routes or locale switch, test both `pt-BR` and `en` paths.
- If touching section layout, verify home + projects + project details pages.
- Run `pnpm lint`, `pnpm type-check` and `pnpm build` before committing.
- Keep this file and `CLAUDE.md` updated when major architectural changes happen; keep `src/components/ui/CLAUDE.md` and `AGENTS.md` identical.
